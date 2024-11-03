import { motion } from 'framer-motion';
import { History, Trophy } from 'lucide-react';
import { getGameHistory } from '../utils/storage';

export function GameHistory() {
  const history = getGameHistory();

  if (history.length === 0) {
    return (
      <div className="text-center text-emerald-100/80 p-8">
        <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>No games played yet. Start playing to see your history!</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto space-y-4"
    >
      <h2 className="text-2xl font-bold text-emerald-100 mb-6 flex items-center gap-3">
        <Trophy className="w-6 h-6 text-emerald-400" />
        Recent Games
      </h2>

      {history.map((game) => (
        <motion.div
          key={game.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-4 rounded-lg bg-emerald-800/20 backdrop-blur-sm"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-lg font-semibold text-emerald-100">
                Score: {game.score}
              </p>
              <p className="text-sm text-emerald-100/70">
                {new Date(game.date).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-emerald-100/80">
                Chain length: {game.chain.length}
              </p>
              <p className="text-sm text-emerald-100/70">
                Started with: {game.startWord}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {game.chain.map((word, index) => (
              <div
                key={index}
                className="px-2 py-1 rounded bg-emerald-900/30 text-sm text-emerald-100"
              >
                {word.word}
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}