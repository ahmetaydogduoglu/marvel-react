export function bigToSmall(data) {
    const result = data.sort(function (a, b) {
        if (a.name > b.name) {
            return -1;
        }
        if (b.name > a.name) {
            return 1;
        }
        return 0;
    })
    return result

}

export function smallToBig(data) {
    const result = data.sort(function (a, b) {
        if (a.name > b.name) {
            return 1;
        }
        if (b.name > a.name) {
            return -1;
        }
        return 0;
    })
    return result

}

export function dateSmallToBig(data) {
    const result = data.sort(function (a, b) {
        return new Date(a.modified).getTime() - new Date(b.modified).getTime()
    })
    return result;
}

export function dateBigToSmall(data) {

    const result = data.sort(function (a, b) {
        return new Date(b.modified).getTime() - new Date(a.modified).getTime()
    })

    return result;
}


