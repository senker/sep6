import Card from "../Card/Card";
import styles from "./CardList.module.scss"
import { CardListProps } from "@/types/cardListProps.dto";

const CardList: React.FC<CardListProps> = ({ cards }) => (
    <div className={styles.cards}>
      {cards.map((card) => {
        return <Card key={card.id} Card={card} />;
      })}
    </div>
  );
    
export default CardList;