import SectionMessage, {
  SectionMessageAction,
} from "@atlaskit/section-message";
import { Link } from "./common";
import Markdown from "./Markdown";

export const Disclaimer = ({ title, body, link }) => (
  <SectionMessage
    title={title}
    actions={
      link
        ? [
            <Link href={`/${link.cached_url ?? link.url}`}>
              <SectionMessageAction>Avaa</SectionMessageAction>
            </Link>,
          ]
        : undefined
    }
  >
    <Markdown content={body} />
  </SectionMessage>
);
