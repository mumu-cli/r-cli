// 1) 配置可执行命令 commander
const program = require('commander')
const chalk = require('chalk')
const Inquirer = require('inquirer')

// 核心功能 1.创建项目  2.更改配置文件   3.ui界面 @vue/ui

const cleanArgs = (cmd) => {
  // {force:true}
  const args = {}
  cmd.options.forEach((o) => {
    const key = o.long.slice(2)
    if (cmd[key]) args[key] = cmd[key]
  })
  return args
}

program
  .command('create [app-name]')
  .description('create a new project')
  .option('-f, --force', 'overwrite target directory if it exists')
  .action(async (name, cmd) => {
    let projectName = name
    if (!projectName) {
      const { name: name2 } = await Inquirer.prompt({
        name: 'name',
        type: 'input',
        message: '请输入项目名称',
        default: 'myapp',
      })
      projectName = name2
    }
    // 调用create模块去创建
    require('../lib/create')(projectName, cleanArgs(cmd))
  })

// vue config --get a
// vue config --set a 1  => 配置文件中
// vue config -0
program
  .command('config [value]')
  .description('inspect and modify the config')
  .option('-g, --get <path>', 'get value from option')
  .option('-s, --set <path> <value>')
  .option('-d, --delete <path>', 'delete option from config')
  .action((value, cmd) => {
    // 调用config模块去实现
    console.log(value, cleanArgs(cmd))
  })

program
  .command('ui')
  .description('start and open rsan-cli ui')
  .option('-p, --port <port>', 'Port used for the UI Server')
  .action((cmd) => {
    // 调用ui模块实现
    console.log(cleanArgs(cmd))
  })

program
  .version(`rsan-cli@${require('../package.json').version}`)
  .usage(`<command> [option]`)

// 解析用户执行命令传入的参数
program.on('--help', function () {
  console.log()
  console.log(`Run ${chalk.cyan(`rsan-cli <command> --help`)} show details`)
  console.log()
})

program.parse(process.argv)
