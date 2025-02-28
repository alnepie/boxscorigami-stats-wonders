import { useRecentUniqueGames } from '../hooks/useBoxScores';

export const UniqueStatlines = () => {
  const { data: uniqueGames, isLoading, error } = useRecentUniqueGames();
  
  console.log('UniqueStatlines render:', { isLoading, error, dataLength: uniqueGames?.length }) // Debug log

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        Error loading unique statlines
      </div>
    );
  }

  if (!uniqueGames?.length) {
    return (
      <div className="text-gray-500 p-4">
        No unique statlines found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">First-Time Stat Combinations</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {uniqueGames.map((game) => (
          <div
            key={game.id}
            className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
          >
            <div className="font-semibold text-lg text-gray-900">
              {game.player_name}
            </div>
            <div className="text-gray-600">
              {new Date(game.game_date).toLocaleDateString()}
            </div>
            <div className="mt-2 flex justify-between text-lg">
              <span>{game.points} PTS</span>
              <span>{game.rebounds} REB</span>
              <span>{game.assists} AST</span>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {game.team} vs {game.opponent}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 