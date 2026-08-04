import { Fragment } from 'react';
import { MapPin } from 'lucide-react';
import type { BoolMap, Region } from '../types';
import Section from './Section';
import CheckRow from './CheckRow';
import SubHeading from './SubHeading';
import KorokCounter from './KorokCounter';
import ProgressBar from './ProgressBar';

interface RegionSectionProps {
  region: Region;
  state: BoolMap;
  onToggleItem: (itemId: string) => void;
  korokCount: number;
  onKorokChange: (value: string) => void;
}

export default function RegionSection({ region, state, onToggleItem, korokCount, onKorokChange }: RegionSectionProps) {
  const checklists = [
    { title: 'Quests', items: region.quests || [] },
    { title: 'Torres', items: region.towers },
    { title: `Santuários (${region.shrines.filter(s => state[s.id]).length}/${region.shrines.length})`, items: region.shrines },
    { title: `Side Quests (${region.sidequests.filter(q => state[q.id]).length}/${region.sidequests.length})`, items: region.sidequests },
    { title: 'Memórias, itens e extras', items: region.extras },
  ];
  const allItems = checklists.flatMap(c => c.items);
  const done = allItems.filter(i => state[i.id]).length;
  const total = allItems.length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <Section
      title={`${region.name} (${done}/${total})`}
      icon={<MapPin size={16} className="text-emerald-400" />}
      defaultOpen={false}
    >
      {region.description && <div className="text-sm text-stone-400 mb-3">{region.description}</div>}
      <div className="mb-3">
        <ProgressBar pct={pct} />
      </div>
      {checklists.map(({ title, items }) => (
        items.length > 0 && (
          <Fragment key={title}>
            <SubHeading>{title}</SubHeading>
            {items.map(item => (
              <CheckRow
                key={item.id}
                label={item.name}
                sub={item.sub}
                detail={item.detail}
                checked={!!state[item.id]}
                onToggle={() => onToggleItem(item.id)}
              />
            ))}
          </Fragment>
        )
      ))}
      <KorokCounter value={korokCount} total={region.koroksTotal} onChange={onKorokChange} />
    </Section>
  );
}
