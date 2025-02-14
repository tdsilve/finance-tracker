import Link from "next/link";
import { Logo } from "../logo";
import { Heading } from "../heading";
import { Flex } from "../flex";

export const HeaderLogo = () => {
  return (
    <Link href={"/"} className="hidden flex-col gap-2 lg:flex">
      <Flex gap={1} col>
        <Logo width={"70"} height={"60"} />
        <Heading className="text-white " tag="h4">
          Finance
        </Heading>
      </Flex>
    </Link>
  );
};
