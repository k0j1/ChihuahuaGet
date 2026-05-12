import { useEffect, useState } from "react";
import sdk, { Context } from "@farcaster/frame-sdk";

// Global cache
let globalIsLoaded = false;
let globalContext: Context.FrameContext | undefined;
let initPromise: Promise<void> | null = null;

export function useFarcaster() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(globalIsLoaded);
  const [context, setContext] = useState<Context.FrameContext | undefined>(globalContext);

  useEffect(() => {
    if (globalIsLoaded) return;

    if (!initPromise) {
      initPromise = (async () => {
        try {
          const ctx = await sdk.context;
          globalContext = ctx;
          sdk.actions.ready();
        } catch (error) {
          console.error("Farcaster SDK initialization failed", error);
        } finally {
          globalIsLoaded = true;
        }
      })();
    }

    initPromise.then(() => {
      setIsSDKLoaded(globalIsLoaded);
      setContext(globalContext);
    });
  }, []);

  return {
    isSDKLoaded,
    context,
    user: context?.client?.clientFid ? {
      fid: context.client.clientFid,
      username: context.user?.username,
      displayName: context.user?.displayName,
      pfpUrl: context.user?.pfpUrl,
    } : null,
  };
}
