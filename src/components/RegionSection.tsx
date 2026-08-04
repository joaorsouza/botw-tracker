import { Fragment } from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import type { BoolMap, Chest, KorokSeed, Region } from '../types';
import { CHEST_QUERY_BY_REGION } from '../data/chests';
import Section from './Section';
import CheckRow from './CheckRow';
import SubHeading from './SubHeading';
import KorokCounter from './KorokCounter';
import KorokChecklist from './KorokChecklist';
import ChestChecklist from './ChestChecklist';
import ProgressBar from './ProgressBar';

interface RegionSectionProps {
  region: Region;
  state: BoolMap;
  onToggleItem: (itemId: string) => void;
  korokSeeds: KorokSeed[];
  korokChecks: BoolMap;
  onToggleKorok: (korokId: string) => void;
  chests: Chest[];
  chestChecks: BoolMap;
  onToggleChest: (chestId: string) => void;
  manualKorokCount: number;
  onKorokChange: (value: string) => void;
}

export default function RegionSection({
  region, state, onToggleItem, korokSeeds, korokChecks, onToggleKorok,
  chests, chestChecks, onToggleChest, manualKorokCount, onKorokChange,
}: RegionSectionProps) {
  const checklists = [
    { title: 'Quests', items: region.quests || [] },
    { title: 'Torres', items: region.towers },
    { title: `Santuários (${region.shrines.filter(s => state[s.id]).length}/${region.shrines.length})`, items: region.shrines },
    { title: `Side Quests (${region.sidequests.filter(q => state[q.id]).length}/${region.sidequests.length})`, items: region.sidequests },
    { title: 'Memórias, itens e extras', items: region.extras },
  ];
  // Monta um link do objmap já centrado na região com uma busca pré-preenchida.
  const regionMapUrl = (q: string) => {
    const pos = region.mapPos ? `z${region.mapPos.zoom},${region.mapPos.x},${region.mapPos.z}` : 'z3,0,0';
    return `https://objmap.zeldamods.org/#/map/${pos}?q=${encodeURIComponent(q)}`;
  };
  const korokMapUrl = (terms: string[]) => regionMapUrl(terms.length ? `korok:(${terms.join(' OR ')})` : 'Korok');
  const zonePrefixes = [...new Set(korokSeeds.map(s => s.id.replace(/[0-9]+$/, '')))].map(z => `${z}*`);
  const checkedIds = korokSeeds.filter(s => korokChecks[s.id]).map(s => s.id);
  const missingIds = korokSeeds.filter(s => !korokChecks[s.id]).map(s => s.id);
  const allItems = checklists.flatMap(c => c.items);
  const done = allItems.filter(i => state[i.id]).length;
  const total = allItems.length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const checklistCount = checkedIds.length;

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
      <KorokCounter
        manualValue={manualKorokCount}
        checklistCount={checklistCount}
        total={korokSeeds.length || region.koroksTotal}
        onChange={onKorokChange}
      />
      <div className="mt-3">
        <KorokChecklist seeds={korokSeeds} state={korokChecks} onToggle={onToggleKorok} />
      </div>
      {chests.length > 0 && (
        <ChestChecklist chests={chests} state={chestChecks} onToggle={onToggleChest} />
      )}
      <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
        <a
          href={korokMapUrl(zonePrefixes)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-amber-300/80 hover:text-amber-200 transition-colors"
        >
          <ExternalLink size={12} />
          Todos os koroks da região no mapa (objmap)
        </a>
        {checklistCount > 0 && missingIds.length > 0 && (
          <a
            href={korokMapUrl(missingIds)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-red-300/80 hover:text-red-200 transition-colors"
          >
            <ExternalLink size={12} />
            Os {missingIds.length} que faltam
          </a>
        )}
        {checklistCount > 0 && (
          <a
            href={korokMapUrl(checkedIds)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-emerald-300/80 hover:text-emerald-200 transition-colors"
          >
            <ExternalLink size={12} />
            Os {checklistCount} já pegos
          </a>
        )}
        {CHEST_QUERY_BY_REGION[region.id] && (
          <a
            href={regionMapUrl(CHEST_QUERY_BY_REGION[region.id])}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-amber-300/80 hover:text-amber-200 transition-colors"
          >
            <ExternalLink size={12} />
            Todos os baús da região no mapa
          </a>
        )}
      </div>
    </Section>
  );
}
