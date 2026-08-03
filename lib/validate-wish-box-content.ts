export interface WishBoxImage {
  readonly src: string;
  readonly alt: string;
}

export type WishBoxMemory = WishBoxImage;

export type WishBoxMemories = readonly [WishBoxMemory, WishBoxMemory, WishBoxMemory, WishBoxMemory];

export interface WishBoxContent {
  readonly metadata: {
    readonly title: string;
    readonly description: string;
  };
  readonly senderName: string;
  readonly recipientName: string;
  readonly message: {
    readonly title: string;
    readonly body: readonly [string, ...string[]];
  };
  readonly character: {
    readonly closed: WishBoxImage;
    readonly open: WishBoxImage;
  };
  readonly memories: WishBoxMemories;
}

export const wishBoxContentLimits = {
  name: 40,
  metadataTitle: 60,
  metadataDescription: 160,
  messageTitle: 60,
  messageParagraphs: 3,
  messageParagraph: 240,
  messageBody: 600,
  imageAlt: 120,
} as const;

type UnknownRecord = Record<string, unknown>;

function contentError(path: string, requirement: string): Error {
  return new Error(`Invalid wish box content at ${path}: ${requirement}`);
}

function readRecord(value: unknown, path: string): UnknownRecord {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw contentError(path, "must be an object");
  }

  return value as UnknownRecord;
}

function characterCount(value: string): number {
  return Array.from(value).length;
}

function readText(value: unknown, path: string, maximum?: number): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw contentError(path, "must be a non-empty string");
  }

  if (maximum !== undefined && characterCount(value) > maximum) {
    throw contentError(path, `must be at most ${maximum} characters`);
  }

  return value;
}

function readImage(value: unknown, path: string): WishBoxImage {
  const image = readRecord(value, path);

  return {
    src: readText(image.src, `${path}.src`),
    alt: readText(image.alt, `${path}.alt`, wishBoxContentLimits.imageAlt),
  };
}

export function validateWishBoxContent(content: unknown): WishBoxContent {
  const root = readRecord(content, "content");
  const metadata = readRecord(root.metadata, "metadata");
  const message = readRecord(root.message, "message");
  const character = readRecord(root.character, "character");

  if (!Array.isArray(message.body)) {
    throw contentError("message.body", "must be an array");
  }

  if (message.body.length < 1 || message.body.length > wishBoxContentLimits.messageParagraphs) {
    throw contentError(
      "message.body",
      `must contain 1-${wishBoxContentLimits.messageParagraphs} paragraphs`,
    );
  }

  const body = message.body.map((paragraph, index) =>
    readText(paragraph, `message.body[${index}]`, wishBoxContentLimits.messageParagraph),
  ) as [string, ...string[]];
  const bodyLength = body.reduce((total, paragraph) => total + characterCount(paragraph), 0);

  if (bodyLength > wishBoxContentLimits.messageBody) {
    throw contentError(
      "message.body",
      `must total at most ${wishBoxContentLimits.messageBody} characters`,
    );
  }

  if (!Array.isArray(root.memories) || root.memories.length !== 4) {
    throw contentError("memories", "must contain exactly 4 items");
  }

  const memories: WishBoxMemories = [
    readImage(root.memories[0], "memories[0]"),
    readImage(root.memories[1], "memories[1]"),
    readImage(root.memories[2], "memories[2]"),
    readImage(root.memories[3], "memories[3]"),
  ];

  return {
    metadata: {
      title: readText(metadata.title, "metadata.title", wishBoxContentLimits.metadataTitle),
      description: readText(
        metadata.description,
        "metadata.description",
        wishBoxContentLimits.metadataDescription,
      ),
    },
    senderName: readText(root.senderName, "senderName", wishBoxContentLimits.name),
    recipientName: readText(root.recipientName, "recipientName", wishBoxContentLimits.name),
    message: {
      title: readText(message.title, "message.title", wishBoxContentLimits.messageTitle),
      body,
    },
    character: {
      closed: readImage(character.closed, "character.closed"),
      open: readImage(character.open, "character.open"),
    },
    memories,
  };
}
