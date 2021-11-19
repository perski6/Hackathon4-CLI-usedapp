import { program } from 'commander'
import Web3 from 'web3'
import axios from 'axios'

const web3 = new Web3(new Web3.providers.HttpProvider('localhost'))

type ContractRequest = {
    status: string
    message: string
    result: string
}

type singleContractObject = {
    constant: boolean
    inputs: any
    name: string
    outputs: any
    type: string
}

program.version('0.0.1')

function leaveOnlyFunctions(jsonObject: singleContractObject[]) {
    const result: singleContractObject[] = []
    for(const obj of jsonObject) {
        if(obj.type === 'function') {
            result.push(obj)
        }
    }
    return result
}

async function createInterface(contractAddress: string) {
    
    const response = await axios.get('https://api.etherscan.io/api?module=contract&action=getabi&address=' + contractAddress)
    
    const data: ContractRequest = response.data

    const contractABI = JSON.parse(data.result);;
    if (contractABI) {
        const filteredContractAbi = leaveOnlyFunctions(contractABI)
        console.log(filteredContractAbi)
    } else {
        console.log('Error')
    }
}

program
    .command('createInterface')
    .argument('<contractAddress>')
    .description('Create contract clickable interface')
    .action((contractAddress) => {
        createInterface(contractAddress)
    })

program.parse(process.argv)
