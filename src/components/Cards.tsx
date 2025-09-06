import { Animations, Cards, Titles } from "@/app/styles";
import Link from "next/link";
import { IconType } from "react-icons";

interface CardProps {
  id: string
  title: string,
  description: string,
  icon: IconType,
}

const Card = ({ id, title, description, icon }: CardProps) => {
  const IconComponent = icon;
  return (
    <div
      key={id}
      className="bg-zinc-100 dark:bg-zinc-700 rounded-xl shadow-lg p-4 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer group h-full"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-2 bg-sky-100 rounded-full group-hover:bg-blue-200 transition-colors duration-300">
          <IconComponent
            size={28}
            className="text-sky-600 group-hover:text-sky-700 transition-colors duration-300"
          />
        </div>
        <h3 className="m-0 text-xl font-semibold text-gray-600 dark:text-gray-200">
          {title}
        </h3>
        <p className="leading-relaxed text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
}

interface VerticalBandedProps {
  left: React.ReactNode;
  children: React.ReactNode;
  containerCls?: string;
  leftCls?: string;
  rightCls?: string;
  leftCentered?: boolean;
}

export function VerticalBanded({ left, children, containerCls, leftCls, rightCls, leftCentered = true }: VerticalBandedProps) {
  const leftAlignmentCls = leftCentered ? "flex justify-center items-center" : "";
  return (
    <div className={`flex ${containerCls}`}>
      <div className={`${leftCls} ${leftAlignmentCls}`}>
        {left}
      </div>
      <div className={`flex-col ${rightCls}`}>
        {children}
      </div>
    </div>
  );
}


const VCard = ({ id, title, description, icon }: CardProps) => {
  const iconCls = "text-sky-600 dark:text-sky-200 group-hover:text-sky-700 transition-colors duration-300";
  const containerCls = `w-full min-h-full bg-zinc-100 dark:bg-zinc-700 rounded-lg shadow-md overflow-hidden border border-zinc-200 dark:border-zinc-700 ${Animations.ANIMATION_SCALE_AND_SHADOW_CLS} hover:shadow-lg`;
  const IconComponent = icon;
  return (
    <div
      key={id}
      className={containerCls}
    >
      <VerticalBanded
        left={<IconComponent size={32} className={iconCls} />}
        containerCls="min-h-full"
        leftCls="w-20 bg-sky-100 dark:bg-sky-700 group-hover:bg-blue-200 transition-colors duration-300"
        rightCls="p-6"
      >
        <h3 className={`${Cards.CARD_RIGHT_TITLE_CLS}`}>
          {title}
        </h3>
        <p className={`${Cards.CARD_RIGHT_DESCRIPTION_CLS}`}>
          {description}
        </p>
      </VerticalBanded>
    </div>
  );
}

interface ConditionalLinkProps {
  children: React.ReactNode,
  href?: string,
  condition: boolean,
}

export function ConditionalLink({ children, href, condition }: ConditionalLinkProps) {
  if (condition && href) {
    return <Link href={href}>{children}</Link>;
  }
  return <>{children}</>; 
};

interface CardGridProps {
  title?: string | null,
  cards: {
    id: string,
    title: string,
    description: string,
    icon: IconType,
    slug?: string,
  }[],
  vertical?: boolean,
  link?: boolean,
}

const CardGrid = ({ title, cards, vertical = false, link = false }: CardGridProps) => {
  return (
    <div className="mt-8">
      <div className="max-w-7xl mx-auto">
        {title && <h1 className={`${Titles.PAGE_TITLE} mb-8`}>{title}</h1>}
        <div className={`grid grid-cols-1 ${!vertical && "sm:grid-cols-2 lg:grid-cols-3"} gap-6 auto-rows-[1fr]`}>
          {cards.map((card) => {
            const CardComponent = vertical ? VCard : Card;
            return (
              <ConditionalLink key={card.id} href={card.slug ? `${card.slug}` : undefined} condition={link}>
                <CardComponent
                  key={card.id}
                  id={`${card.id}`}
                  title={card.title}
                  description={card.description}
                  icon={card.icon} />
              </ConditionalLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CardGrid;