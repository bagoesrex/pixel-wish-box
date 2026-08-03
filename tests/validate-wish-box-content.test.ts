import { validateWishBoxContent } from "@/lib/validate-wish-box-content";
import { describe, expect, it } from "vitest";

function createValidContent() {
  return {
    metadata: {
      title: "Untukmu | Pixel Wish Box",
      description: "Hadiah digital personal dari seseorang tersayang.",
    },
    senderName: "Pengirim",
    recipientName: "Penerima",
    message: {
      title: "Untukmu",
      body: ["Paragraf pertama.", "Paragraf kedua."],
    },
    character: {
      closed: {
        src: "/images/character/closed.png",
        alt: "Karakter pengirim membawa kotak tertutup",
      },
      open: {
        src: "/images/character/open.png",
        alt: "Karakter pengirim membawa kotak terbuka",
      },
    },
    memories: [
      { src: "/images/memories/01.jpg", alt: "Kenangan pertama" },
      { src: "/images/memories/02.jpg", alt: "Kenangan kedua" },
      { src: "/images/memories/03.jpg", alt: "Kenangan ketiga" },
      { src: "/images/memories/04.jpg", alt: "Kenangan keempat" },
    ],
  };
}

describe("validateWishBoxContent", () => {
  it("returns valid serializable content", () => {
    const result = validateWishBoxContent(createValidContent());

    expect(result.memories).toHaveLength(4);
    expect(() => JSON.stringify(result)).not.toThrow();
  });

  it("rejects empty required fields with their field path", () => {
    const content = createValidContent();
    content.senderName = "   ";

    expect(() => validateWishBoxContent(content)).toThrow("senderName");
  });

  it("rejects fields over their character limit", () => {
    const content = createValidContent();
    content.metadata.description = "a".repeat(161);

    expect(() => validateWishBoxContent(content)).toThrow("metadata.description");
  });

  it("requires one to three message paragraphs", () => {
    const emptyBody = createValidContent();
    emptyBody.message.body = [];
    const longBody = createValidContent();
    longBody.message.body = ["one", "two", "three", "four"];

    expect(() => validateWishBoxContent(emptyBody)).toThrow("message.body");
    expect(() => validateWishBoxContent(longBody)).toThrow("message.body");
  });

  it("rejects a paragraph over 240 characters", () => {
    const content = createValidContent();
    content.message.body = ["a".repeat(241)];

    expect(() => validateWishBoxContent(content)).toThrow("message.body[0]");
  });

  it("rejects message bodies over 600 total characters", () => {
    const content = createValidContent();
    content.message.body = ["a".repeat(201), "b".repeat(200), "c".repeat(200)];

    expect(() => validateWishBoxContent(content)).toThrow("message.body");
  });

  it("requires exactly four memories", () => {
    const content = createValidContent();
    content.memories.pop();

    expect(() => validateWishBoxContent(content)).toThrow("memories");
  });

  it("validates nested memory fields", () => {
    const content = createValidContent();
    content.memories[2].alt = " ";

    expect(() => validateWishBoxContent(content)).toThrow("memories[2].alt");
  });
});
