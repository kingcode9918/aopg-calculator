import Image from "next/image";
import { type RaceBuffs } from "../data/buffs";

const BuffCard = ({ buff }: { buff: RaceBuffs }) => (
  <div className="card bg-base-100 w-80 shadow-sm">
    <figure className="p-4">
      <Image
        src={buff.image}
        alt={buff.name}
        width={220}
        height={220}
        className="rounded-xl"
      />
    </figure>
    <div className="card-body pt-0">
      <h2 className="card-title">{buff.name}</h2>
      <ul className="space-y-1 text-sm">
        <li className="custom-text-fruit">🍇 Fruit Buff: {buff.fruitbuff}x</li>
        <li className="custom-text-sword">🗡️ Sword Buff: {buff.swordbuff}x</li>
        <li className="custom-text-gun">🔫 Gun Buff: {buff.gunbuff}x</li>
        <li className="custom-text-strength">
          💪 Strength Buff: {buff.strengthbuff}x
        </li>
        {buff.note && <li>📝 {buff.note}</li>}
      </ul>
    </div>
  </div>
);

const BuffCardList = ({ data }: { data: RaceBuffs[] }) => (
  <div className="flex flex-wrap gap-4 justify-center py-2">
    {data.map((buff) => (
      <BuffCard key={buff.id} buff={buff} />
    ))}
  </div>
);

export default BuffCardList;
