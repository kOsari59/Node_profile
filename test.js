function waitDuration(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getTranaction1() {
    await waitDuration(1000);
    console.log('Transaction1');
    return 'Transaction1';
    
}

async function getTranaction2() {
    await waitDuration(1000);
    console.log('Transaction2');
    return 'Transaction2';
    
}

async function getTranaction3() {
    waitDuration(1000).then(() => 'Transaction3');
    console.log('Transaction2')
    
}

function pickTransactions() {
    return getTranaction1().then(TR1 => {
        return getTranaction2().then(TR2 => `${TR1}+ ${TR2}`);
    });
}

async function pickTransactions2() {
    const TR1 = await getTranaction1();
    const TR2 = await getTranaction2();
    return `${TR1}+ ${TR2}`;
}

async function pickTransactions3() {
    const tr1Promise = getTranaction1();
    const tr2Promise = getTranaction2();
    const TR1 = await tr1Promise;
    const TR2 = await tr2Promise;
    return `${TR1}+ ${TR2}`;
}

console.time(111);
console.log(pickTransactions3());
console.timeEnd(111);
