interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'My personal Neovim configuration',
    description: `VVimston is my personal Neovim configuration. It might not fit your needs, but I included many plugins so that you can tailor them to meet your requirements.`,
    imgSrc: '/static/images/projects/VVimston.png',
    href: 'https://github.com/ZWindL/VVimston',
  },
]

export default projectsData
