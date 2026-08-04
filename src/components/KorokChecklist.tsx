import { Fragment } from 'react';
import { Check, Circle, ExternalLink, Leaf } from 'lucide-react';
import type { BoolMap, KorokSeed } from '../types';
import { KOROK_ZONE_NAMES } from '../data/koroks';
import Section from './Section';
import SubHeading from './SubHeading';

interface KorokChecklistProps {
  seeds: KorokSeed[];
  state: BoolMap;
  onToggle: (korokId: string) => void;
}

const zoneOf = (id: string) => id.replace(/[0-9]+$/, '');

const objmapUrl = (s: KorokSeed) =>
  `https://objmap.zeldamods.org/#/map/z6,${s.x},${s.z}?id=MainField,${s.map},${s.hash}`;

export default function KorokChecklist({ seeds, state, onToggle }: KorokChecklistProps) {
  const done = seeds.filter(s => state[s.id]).length;
  const zones = [...new Set(seeds.map(s => zoneOf(s.id)))];

  return (
    <Section
      title={`Koroks (${done}/${seeds.length})`}
      icon={<Leaf size={16} className="text-lime-400" />}
      defaultOpen={false}
    >
      <div className="text-xs text-stone-400 mb-3">
        Marque os koroks que você já pegou — o ícone de link abre o ponto exato no mapa interativo (objmap).
      </div>
      {zones.map(zone => {
        const zoneSeeds = seeds.filter(s => zoneOf(s.id) === zone);
        const zoneDone = zoneSeeds.filter(s => state[s.id]).length;
        return (
          <Fragment key={zone}>
            {zones.length > 1 && (
              <SubHeading>{`Zona ${zone} — ${KOROK_ZONE_NAMES[zone] || zone} (${zoneDone}/${zoneSeeds.length})`}</SubHeading>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 mb-2">
              {zoneSeeds.map(s => {
                const checked = !!state[s.id];
                return (
                  <div
                    key={s.id}
                    className={`flex items-center rounded ${checked ? 'bg-emerald-900/30' : 'bg-stone-800/40'}`}
                  >
                    <button
                      onClick={() => onToggle(s.id)}
                      className={`flex-1 flex items-center gap-1.5 px-2 py-1.5 text-sm text-left transition-colors ${
                        checked ? 'text-emerald-200 hover:bg-emerald-900/20' : 'text-stone-200 hover:bg-stone-800'
                      }`}
                    >
                      {checked
                        ? <Check size={13} className="text-emerald-400 shrink-0" />
                        : <Circle size={13} className="text-stone-500 shrink-0" />}
                      <span className={checked ? 'line-through decoration-emerald-500/60' : ''}>{s.id}</span>
                    </button>
                    <a
                      href={objmapUrl(s)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-1.5 py-1.5 text-stone-500 hover:text-amber-300 transition-colors"
                      aria-label={`Ver korok ${s.id} no mapa`}
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
