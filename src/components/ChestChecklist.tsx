import { Fragment } from 'react';
import { Check, Circle, ExternalLink, Package } from 'lucide-react';
import type { BoolMap, Chest } from '../types';
import Section from './Section';
import SubHeading from './SubHeading';

interface ChestChecklistProps {
  chests: Chest[];
  state: BoolMap;
  onToggle: (chestId: string) => void;
}

const objmapUrl = (c: Chest) =>
  `https://objmap.zeldamods.org/#/map/z6,${c.x},${c.z}?id=MainField,${c.map},${c.hash}`;

export default function ChestChecklist({ chests, state, onToggle }: ChestChecklistProps) {
  const done = chests.filter(c => state[String(c.hash)]).length;
  const quadrants = [...new Set(chests.map(c => c.map))];

  return (
    <Section
      title={`Baús (${done}/${chests.length})`}
      icon={<Package size={16} className="text-amber-400" />}
      defaultOpen={false}
    >
      <div className="text-xs text-stone-400 mb-3">
        Baús do overworld em jogo normal (sem os exclusivos de Master Mode), agrupados por quadrante do mapa.
        Não contam pros 100% do jogo — é completionismo opcional. O ícone de link abre o ponto exato no objmap.
      </div>
      {quadrants.map(quad => {
        const quadChests = chests.filter(c => c.map === quad);
        const quadDone = quadChests.filter(c => state[String(c.hash)]).length;
        return (
          <Fragment key={quad}>
            {quadrants.length > 1 && (
              <SubHeading>{`Quadrante ${quad} (${quadDone}/${quadChests.length})`}</SubHeading>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mb-2">
              {quadChests.map(c => {
                const id = String(c.hash);
                const checked = !!state[id];
                return (
                  <div
                    key={id}
                    className={`flex items-center rounded ${checked ? 'bg-emerald-900/30' : 'bg-stone-800/40'}`}
                  >
                    <button
                      onClick={() => onToggle(id)}
                      className={`flex-1 flex items-center gap-1.5 px-2 py-1.5 text-sm text-left transition-colors ${
                        checked ? 'text-emerald-200 hover:bg-emerald-900/20' : 'text-stone-200 hover:bg-stone-800'
                      }`}
                    >
                      {checked
                        ? <Check size={13} className="text-emerald-400 shrink-0" />
                        : <Circle size={13} className="text-stone-500 shrink-0" />}
                      <span className="min-w-0">
                        <span className={`block truncate ${checked ? 'line-through decoration-emerald-500/60' : ''}`}>{c.name}</span>
                        <span className="block text-xs text-stone-500 truncate">{c.kind}</span>
                      </span>
                    </button>
                    <a
                      href={objmapUrl(c)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-1.5 py-1.5 text-stone-500 hover:text-amber-300 transition-colors"
                      aria-label={`Ver baú (${c.name}) no mapa`}
                    >
                      <ExternalLink size={12} />
                    </a>
                  </div>
                );
              })}
            </div>
          </Fragment>
        );
      })}
    </Section>
  );
}
