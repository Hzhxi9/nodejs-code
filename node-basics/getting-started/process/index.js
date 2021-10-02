
/**
 * 进程的管理（Process）
 * 运行: node 2.3-process.js argv1 argv2
 * @param {*} args 
 */
function main(args){
    console.log(args)
}

main(process.argv.slice(2)) /**[argv1, argv2] */