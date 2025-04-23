import request from "request";


/**
 * Uses wizard API to find a spell taht can be specified by name, type and incantation
 * @param name - Name 
 * @param type - Type of spell
 * @param incantation - The actual spell
 * @returns A promise to handle results
 */
export function findSpell(name?: string, type?: string, incantation?: string): Promise<Object[]> {
  return new Promise<Object[]>((resolve, reject) => {
    let query = ''
    if (name || type || incantation) {
      query += '?'
    }
    if (name) {
      query += `Name=${name}`
    }
    if (name && type) {
      query += `&Type=${type}`
    }
    else if (type) {
      query += `Type=${type}`
    }
    if ((name || type) && incantation) {
      query += `&Incantation=${incantation}`
    }
    else if (incantation) {
      query += `Incantation=${incantation}`
    }
    const url = `http://wizard-world-api.herokuapp.com/Spells${query}`
    request({ url: url, json: true }, (error: Error, response: any) => {
      if (error) {
        reject(error)
      }
      else {
        let spells = response.body
        if (spells.length === 0) {
          reject('Spell not found')
        }
        else {
          resolve(spells)
        }
      }
    });
  })
}

findSpell('Openingggg Charm')
.then((spells) => console.log(spells))
.catch((err) => console.log(err))
