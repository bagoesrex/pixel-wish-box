export default function WishBoxPanel() {
  return (
    <div className="absolute right-0 z-50 h-svh w-full max-w-[120svh] p-3">
      <div className="h-full w-full">
        <div className="pixel-corners--wrapper min-h-full min-w-full bg-[#ffe2e2]">
          <div className="absolute inset-0 flex size-full items-center justify-center p-3">
            <div className="relative size-full">
              <div className="pixel-corners--wrapper absolute! inset-0 size-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
