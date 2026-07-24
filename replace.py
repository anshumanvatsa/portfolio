import re

file_path = 'src/data.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# The regex will match from { id: 'selective-encryption' ... to the end of that object },
pattern = r"\{\s*id:\s*'selective-encryption'[\s\S]*?status:\s*'open-source',\s*\}"

replacement = '''{
    id: 'vaultview-deception',
    title: 'VaultView - Adaptive Deception System',
    subtitle: 'Behavior-Driven Cybersecurity Platform',
    shortDesc:
      'A cyber-deception system that serves real or AI-generated decoy data based on real-time trust scoring using multi-signal behavioral analysis.',
    tags: ['Deception', 'Flask', 'React'],
    fullTags: ['Adaptive Deception', 'Flask', 'React', 'Behavioral Analysis', 'Honeytokens', 'Python'],
    description:
      'A behavior-driven cybersecurity platform designed to protect sensitive data through Adaptive Deception. Instead of relying solely on binary access control (allow/deny), VaultView continuously scores a user\\'s behavior in real-time. Depending on the user\\'s \"Trust Score\", the system dynamically alters the reality they see: serving real data to trusted users, deploying tarpits and honeytokens to suspicious users, and feeding entirely fake/decoy data to hostile attackers.',
    challenges: [
      'Designing a real-time behavioral trust engine that accurately scores user intent.',
      'Implementing seamless on-the-fly generation of decoy data that appears indistinguishable from real data.',
      'Developing an effective 3-tier deception model (Trusted, Suspicious, Hostile) to mitigate attacks without impacting real users.',
    ],
    achievements: [
      'Real-time behavioral trust engine with 5 distinct signals.',
      'Dynamic 3-tier deception response mechanism including tarpitting and honeytokens.',
      'Comprehensive audit logging for hostile actors.',
    ],
    architecture: 'React UI → Flask API → Trust Engine → Adaptive Deception Logic → DB',
    liveUrl: 'https://vaultview-deception.vercel.app',
    githubUrl: 'https://github.com/anshumanvatsa/adaptive-deception-system',
    previewImage: '/vaultview-preview.jpg',
    category: 'fullstack',
    metrics: [
      { label: 'Deception', value: '3-Tier' },
      { label: 'Security', value: 'Behavioral' },
      { label: 'Type', value: 'Cybersecurity' },
    ],
    year: '2026',
    status: 'open-source',
  }'''

new_content = re.sub(pattern, replacement, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print('Replaced successfully.')
