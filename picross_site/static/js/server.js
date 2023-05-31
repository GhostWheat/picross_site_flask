let token = `65f51b56f58de02d3fe86decb0db76d30861589eb6a94100` //this is elephantSQL token

let APIURL = `https://marvel-inventory-flask.glitch.me/api/heroes`
let localURL = `127.0.0.1/5003/api/puzzles`

export const serverCalls = {
    get: async () => {
        const response = await fetch (localURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/JSON',
                'x-access-token': `Bearer ${token}`
            }
        });
        if (!response.ok){
            throw new Error('Failed to fetch MULTI data from server')
        }
        // let temp = response
        // console.log(temp.json())
        // console.log('response:', response)

        return await response.json()
    },

    getOne: async (id) => {
        const response = await fetch (localURL,+`/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/JSON',
                'x-access-token': `Bearer ${token}`
            }
        });
        if (!response.ok){
            throw new Error('Failed to fetch ONE data from server')
        }
        // let temp = response
        // console.log(temp.json())
        // console.log('response:', response)

        return await response.json()
    },

    create: async(data = {}) => {
        const response = await fetch(localURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON',
                'x-access-token': `Bearer ${token}`
            },

            body: JSON.stringify(data)
        });

        console.log(response)

        if(!response.ok){
            throw new Error(`Failed to post new data on server`)
        }

        return await response.json()
    },

    update: async(id, data = {}) => {
        const response = await fetch(localURL+`/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/JSON',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if(!response.ok){
            throw new Error(`Failed to update data on server`)
        }

        console.log(`success: updated hero with id ${id}`)
    },

    delete: async(id) => {
        const response = await fetch(localURL+`/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/JSON',
                'x-access-token': `Bearer ${token}`
            }
        });

        if(!response.ok){
            throw new Error(`Failed to delete puzzle with id ${id}`)
        }

        console.log(`success: puzzle with id ${id} was deleted! Bye bye.`)
    }
}
