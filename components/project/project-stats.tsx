interface ProjectStatsProps {
  developmentTime: string
  codeSize: string
  features: string
  teamSize: string
}

export const ProjectStats = ({ developmentTime, codeSize, features, teamSize }: ProjectStatsProps) => {
  const stats = [
    { label: "DEVELOPED FOR", value: developmentTime },
    { label: "PROJECT SIZE", value: codeSize },
    { label: "FEATURES", value: features },
    { label: "TEAM SIZE", value: teamSize },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
      {stats.map(({ label, value }) => (
        <div key={label}>
          <div className="text-white/60 text-sm mb-1 uppercase tracking-wider">{label}</div>
          <div className="text-white text-2xl font-bold">{value}</div>
        </div>
      ))}
    </div>
  )
} 