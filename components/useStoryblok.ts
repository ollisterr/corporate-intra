/* eslint-disable no-restricted-globals */
import { useState, useEffect } from "react";

const useStoryblok = (origStory, preview = false) => {
  const [story, setStory] = useState(origStory);

  useEffect(() => {
    if (window.storyblok && preview) {
      window.storyblok.init();

      window.storyblok.pingEditor(() => {
        // avoid buggy ts error
        if ((window.storyblok as any).inEditor) {
          window.storyblok.enterEditmode();
          console.log("Storyblok Bridged");
        }
      });

      // reload on Next.js page on save or publish event in Storyblok Visual Editor
      window.storyblok.on(["change", "published"], () => {
        console.log("Newer version of site published. Reloading...");
        location.reload();
      });

      // Update state.story on input in Visual Editor
      // this will alter the state and replaces the current story with a current raw story object and resolve relations
      window.storyblok.on("input", (event) => {
        if (event.story.content._uid === story.content._uid) {
          const newStory = {
            content: window.storyblok.addComments(
              event.story.content,
              event.story.id.toString()
            ),
          };
          window.storyblok.resolveRelations(newStory, [], () =>
            setStory(newStory)
          );
        }
      });
    }
  }, [preview]);

  useEffect(() => {
    setStory(origStory);
  }, [origStory]);

  return story;
};

export default useStoryblok;
