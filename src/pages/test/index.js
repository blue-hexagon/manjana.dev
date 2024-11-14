// src/pages/index.js
import React from 'react';
import {iconsData} from "../index";
import {
    SiAnsible,
    SiBootstrap, SiCisco,
    SiCsharp,
    SiCss3,
    SiDart,
    SiDigitalocean,
    SiDjango,
    SiDocker,
    SiFlask,
    SiFlutter,
    SiGatsby,
    SiGit,
    SiGithub,
    SiGithubactions, SiGnubash,
    SiHeroku,
    SiHtml5,
    SiJavascript,
    SiJest, SiJetbrains,
    SiLatex,
    SiLinux,
    SiMarkdown,
    SiNginx, SiPaloaltosoftware,
    SiPlaywright,
    SiPostgresql,
    SiPostman,
    SiPowershell, SiPycharm,
    SiPytest,
    SiPython,
    SiReact,
    SiSass,
    SiSqlite,
    SiTailwindcss,
    SiTerraform,
    SiTypescript,
    SiVim, SiVmware
} from "react-icons/si";
import {DiJava} from "react-icons/di"; // Import the CSS

const IndexPage = () => {
    return (
        <div>
            <BackgroundPattern />
            <div className="content">
                <h1>Welcome to My Website</h1>
                <p>Here are some of the technologies I work with...</p>
            </div>
        </div>
    );
};

export default IndexPage;

export const BackgroundPattern = () => {
    const iconsData = [
    {Icon: SiCsharp, label: 'C#', level: 3, categories: []},
    {Icon: SiDart, label: 'Dart', level: 2, categories: []},
    {Icon: DiJava, label: 'Java', level: 3, categories: []},
    {Icon: SiPython, label: 'Python', level: 4, categories: []},
    {Icon: SiPytest, label: 'Pytest', level: 3, categories: []},
    {Icon: SiLatex, label: 'LaTeX', level: 2, categories: []},
    {Icon: SiJavascript, label: 'JavaScript', level: 2, categories: []},
    {Icon: SiJest, label: 'Jest', level: 2, categories: []},
    {Icon: SiTypescript, label: 'TypeScript', level: 1, categories: []},
    {Icon: SiReact, label: 'React', level: 2, categories: []},
    {Icon: SiGatsby, label: 'Gatsby', level: 2, categories: []},
    {Icon: SiHtml5, label: 'HTML', level: 4, categories: []},
    {Icon: SiMarkdown, label: 'Markdown', level: 5, categories: []},
    {Icon: SiCss3, label: 'CSS', level: 2, categories: []},
    {Icon: SiSass, label: 'Sass', level: 2, categories: []},
    {Icon: SiBootstrap, label: 'Bootstrap', level: 4, categories: []},
    {Icon: SiTailwindcss, label: 'Tailwind CSS', level: 3, categories: []},
    {Icon: SiPlaywright, label: 'Playwright', level: 5, categories: []},
    {Icon: SiDjango, label: 'Django', level: 4, categories: []},
    {Icon: SiFlask, label: 'Flask', level: 2, categories: []},
    {Icon: SiFlutter, label: 'Flutter', level: 2, categories: []},
    {Icon: SiSqlite, label: 'SQLite', level: 4, categories: []},
    {Icon: SiPostgresql, label: 'PostgreSQL', level: 4, categories: []},
    {Icon: SiNginx, label: 'Nginx', level: 2, categories: []},
    {Icon: SiPostman, label: 'Postman', level: 4, categories: []},
    {Icon: SiTerraform, label: 'Terraform', level: 4, categories: []},
    {Icon: SiVim, label: 'Vim', level: 3, categories: []},
    {Icon: SiGit, label: 'Git', level: 3, categories: []},
    {Icon: SiGithub, label: 'Github', level: 3, categories: []},
    {Icon: SiHeroku, label: 'Heroku', level: 3, categories: []},
    {Icon: SiDocker, label: 'Docker', level: 3, categories: []},
    {Icon: SiGithubactions, label: 'GitHub Actions', level: 2, categories: []},
    {Icon: SiLinux, label: 'Linux', level: 5, categories: []},
    {Icon: SiPowershell, label: 'Powershell', level: 2, categories: []},
    {Icon: SiDigitalocean, label: 'DigitalOcean', level: 3, categories: []},
    {Icon: SiJetbrains, label: 'JetBrains', level: 4, categories: []},
    {Icon: SiPycharm, label: 'PyCharm', level: 5, categories: []},
    {Icon: SiGnubash, label: 'Bash', level: 3, categories: []},
    {Icon: SiVmware, label: 'VMWare', level: 2, categories: []},
    {Icon: SiCisco, label: 'Cisco', level: 4, categories: []},
    {Icon: SiAnsible, label: 'Ansible', level: 2.5, categories: []},
    {Icon: SiPaloaltosoftware, label: 'Paloalto', level: 2, categories: []},

];
    const columns = 6;  // Number of columns in the grid
  const iconSize = 40; // Base icon size

  return (
    <div className="background-pattern">
      <div className="grid-container">
        {iconsData.map((iconData, index) => {
          const { Icon, level } = iconData;
          const size = iconSize + level * 8; // Adjust size based on level
          const row = Math.floor(index / columns);
          const col = index % columns;

          return (
            <div
              key={index}
              className="icon-container"
              style={{
                gridRowStart: row + 1,
                gridColumnStart: col + 1,
                width: `${size}px`,
                height: `${size}px`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Icon size={size} />
            </div>
          );
        })}
      </div>
    </div>
  );
};