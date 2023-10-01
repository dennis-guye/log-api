import "../styles/LogResultView.css";

export const LogResultView = ({ logs }: { logs: string[] }) => {
  return (
    <div className="ResultView">
      {logs.map((log) => (
        <p className="Row">{log}</p>
      ))}
    </div>
  );
};
