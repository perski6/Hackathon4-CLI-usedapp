import { program } from 'commander'
import Web3 from 'web3'
import axios from 'axios'

const web3 = new Web3(new Web3.providers.HttpProvider('localhost'))

type ContractRequest = {
    status: string
    message: string
    result: string
}

program.version('0.0.1')

async function createInterface() {
    
    const response = await axios.get('https://api.etherscan.io/api?module=contract&action=getabi&address=0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359')
    
    const data: ContractRequest = response.data

    const contractABI = JSON.parse(data.result);;
    if (contractABI) {
        console.log(contractABI)
        // const MyContract = web3.eth.contract(contractABI)
        // const myContractInstance = MyContract.at('0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359')
        // const result1 = myContractInstance.memberId('0xfe8ad7dd2f564a877cc23feea6c0a9cc2e783715')
        // console.log('result1 : ' + result1)   
        // const result2 = myContractInstance.members(1)
        // console.log('result2 : ' + result2)
    } else {
        console.log('Error')
    }
}

program
    .command('createInterface')
    .description('Create contract clickable interface')
    .action(createInterface)

program.parse(process.argv)
