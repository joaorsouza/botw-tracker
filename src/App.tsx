import { Trophy, Sparkles } from 'lucide-react';
import REGION_DATA from './data/regions';
import { MAIN_QUESTS, DLC, TOTALS } from './data/gameData';
import { KOROKS_BY_REGION } from './data/koroks';
import { CHESTS_BY_REGION } from './data/chests';
import type { Region } from './types';
import { useProgress } from './hooks/useProgress';
import Section from './components/Section';
import CheckRow from './components/CheckRow';
import RegionSection from './components/RegionSection';

export default function App() {
  const { loaded, error, state, actions } = useProgress();
  const { mainQuests, dlc, regionCounts, regions, korokChecks, chestChecks } = state;

  // Contagem efetiva de koroks: se a região tem algum korok marcado no checklist,
  // vale o checklist; senão, vale o número digitado manualmente.
  const effectiveKoroks = (r: Region) => {
    const checked = (KOROKS_BY_REGION[r.id] || []).filter(s => korokChecks[r.id]?.[s.id]).length;
    return checked > 0 ? checked : (regionCounts[r.key]?.koroks || 0);
  };

  const totalShrines = REGION_DATA.reduce(
    (sum, r) => sum + r.shrines.filter(s => regions[r.id]?.[s.id]).length, 0
  );
  const totalSidequests = REGION_DATA.reduce(
    (sum, r) => sum + r.sidequests.filter(q => regions[r.id]?.[q.id]).length, 0
  );
  const totalKoroks = REGION_DATA.reduce((sum, r) => sum + effectiveKoroks(r), 0);

  const mainDone = MAIN_QUESTS.filter(q => mainQuests[q.id]).length;
  const dlcDone = DLC.filter(d => dlc[d.id]).length;

  const overallPct = Math.round(
    ((totalShrines / TOTALS.shrines) * 25 + (totalKoroks / TOTALS.koroks) * 40 + (totalSidequests / TOTALS.sidequests) * 15 +
     (mainDone / MAIN_QUESTS.length) * 15 + (dlcDone / DLC.length) * 5)
  );

  if (!loaded) {
    return <div className="min-h-screen bg-stone-950 flex items-center justify-center text-stone-400">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 to-stone-900 text-stone-100 p-4 md:p-8 font-sans">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-amber-200 tracking-wide mb-1">
            Breath of the Wild — 100%
          </h1>
          <p className="text-stone-400 text-sm">v{__APP_VERSION__} — Progresso salvo neste navegador</p>
        </div>

        <div className="bg-gradient-to-r from-amber-900/40 to-emerald-900/40 border border-amber-700/40 rounded-lg p-4 mb-5">
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-amber-100 font-semibold">Progresso geral</span>
            <span className="text-2xl font-bold text-amber-300">{overallPct}%</span>
          </div>
          <div className="w-full bg-stone-800 rounded-full h-2.5 mb-2">
            <div
              className="bg-gradient-to-r from-amber-500 to-emerald-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${overallPct}%` }}
            />
          </div>
          <div className="text-xs text-stone-400">
            <span className="text-emerald-300">{totalShrines}/{TOTALS.shrines} santuários</span> · <span className="text-emerald-300">{totalKoroks}/{TOTALS.koroks} koroks</span> · <span className="text-emerald-300">{totalSidequests}/{TOTALS.sidequests} side quests</span>
          </div>
        </div>

        {error && <div className="text-red-400 text-sm mb-3">{error}</div>}

        <Section title="Progresso principal (história)" icon={<Trophy size={16} className="text-amber-400" />}>
          {MAIN_QUESTS.map(q => (
            <CheckRow key={q.id} label={q.name} sub={q.sub} detail={q.detail} checked={!!mainQuests[q.id]} onToggle={() => actions.toggleMainQuest(q.id)} />
          ))}
        </Section>

        <Section title="DLC (Expansion Pass)" icon={<Sparkles size={16} className="text-purple-400" />}>
          {DLC.map(d => (
            <CheckRow key={d.id} label={d.name} checked={!!dlc[d.id]} onToggle={() => actions.toggleDlc(d.id)} />
          ))}
        </Section>

        <div className="text-xs uppercase tracking-wide text-stone-500 mb-2 mt-6 px-1">Regiões — checklists completos</div>
        {REGION_DATA.map(region => (
          <RegionSection
            key={region.id}
            region={region}
            state={regions[region.id] || {}}
            onToggleItem={itemId => actions.toggleRegionItem(region.id, itemId)}
            korokSeeds={KOROKS_BY_REGION[region.id] || []}
            korokChecks={korokChecks[region.id] || {}}
            onToggleKorok={korokId => actions.toggleKorok(region.id, korokId)}
            chests={CHESTS_BY_REGION[region.id] || []}
            chestChecks={chestChecks[region.id] || {}}
            onToggleChest={chestId => actions.toggleChest(region.id, chestId)}
            manualKorokCount={regionCounts[region.key]?.koroks || 0}
            onKorokChange={v => actions.setKoroks(region.key, v)}
          />
        ))}

        
      </div>
    </div>
  );
}
