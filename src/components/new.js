const data1 = {
    a: 1,
    x: null,
    k: [1, 2],
    b: 2,
    c: {
        d: 1,
        e: {
            s: {
                f: {
                    v: 4
                }
            }
        }
    }
}

const data2 = [{
    a: 1,
    x: null,
    k: [1, 2],
    b: 2,
    c: {
        d: 1,
        e: {
            s: {
                f: {
                    v: 4
                }
            }
        }
    }
}];

function cloneNestedData(data) {
    if (Array.isArray(data)){
        return data.map(item => cloneNestedData(item));
    } else if (data !== null && typeof data === 'object') {
        const clonedObject = {};
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                clonedObject[key] = cloneNestedData(data[key]);
            }
        }

        return clonedObject;
    }

    return data;
}

// Test cases:
console.log(JSON.stringify(cloneNestedData(data1) === JSON.stringify(data1); // Expected result: true
console.log(JSON.stringify(cloneNestedData(data2) === JSON.stringify(data2); // Expected result: true