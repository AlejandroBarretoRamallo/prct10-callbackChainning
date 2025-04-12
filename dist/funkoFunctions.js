import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
const log = console.log;
export const checkPath = (user, id, Funko) => {
    const dirPath = path.join(process.cwd(), `/${user}`);
    const filePath = path.join(process.cwd(), `/${user}/${user}.json`);
    return new Promise((resolve, reject) => {
        fs.access(dirPath, (err) => {
            if (err) {
                log(chalk.green(`Creating ${user} directory`));
                fs.mkdir(dirPath, { recursive: true }, (err) => {
                    if (err) {
                        reject('Error creating directory');
                    }
                    else {
                        log(chalk.green('Directory created succesfully'));
                    }
                });
            }
            fs.access(filePath, (err) => {
                if (err) {
                    fs.writeFile(filePath, `[]`, (err) => {
                        if (err) {
                            reject('Error writing the file');
                        }
                        else {
                            reject('File created successfully');
                        }
                    });
                }
                resolve([user, id, Funko]);
            });
        });
    });
};
export const addFunko = (funko, user) => {
    return new Promise((resolve, reject) => {
        let response = {
            success: true,
            error: '',
        };
        fs.readFile(path.join(process.cwd(), `/${user}/${user}.json`), (err, data) => {
            if (err) {
                response.success = false;
                response.error = 'Error reading the file';
                reject(response);
            }
            else {
                let JSONdata = JSON.parse(data.toString());
                let wantedID = JSONdata.filter(Funko => {
                    return Funko.id === funko.id;
                });
                if (wantedID.length !== 0) {
                    response.success = false;
                    response.error = 'Error: funko already added';
                    reject(response);
                }
                else {
                    JSONdata.push(funko);
                    fs.writeFile(path.join(process.cwd(), `/${user}/${user}.json`), JSON.stringify(JSONdata, null, 2), (err) => {
                        if (err) {
                            response.success = false;
                            response.error = 'Error trying to write on the file';
                            reject(response);
                        }
                        resolve(response);
                    });
                }
            }
        });
    });
};
/**
 * Prints information of a funkopop
 * @param funko A funkopop
 */
export function printFunko(funko) {
    console.log('-------------------------------------');
    console.log(`Funko id: ${funko.id}`);
    console.log(`Funko name: ${funko.nombre}`);
    console.log(`Funko description: ${funko.descripcion}`);
    console.log(`Funko type: ${funko.tipo}`);
    console.log(`Funko gender: ${funko.genero}`);
    console.log(`Funko franquise: ${funko.franquicia}`);
    console.log(`Funko franquise id: ${funko.numero}`);
    funko.esExclusivo ? console.log('This funko is exclusive') : console.log('This funko is not exclusive');
    console.log(`Special caracteristics: ${funko.caracteristicasEspeciales}`);
    console.log(`Market value: ${funko.valorMercado}`);
}
/**
 * Prints each funkopop of a list
 * @param user - Username
 */
export const listFunko = (user) => {
    return new Promise((resolve, reject) => {
        let response = {
            success: true,
            error: ''
        };
        fs.readFile(path.join(process.cwd(), `/${user}/${user}.json`), (err, data) => {
            let JSONdata = JSON.parse(data.toString());
            if (JSONdata.length === 0) {
                response.success = false;
                response.error = `Error: the user ${user}'s list is empty`;
                reject(response);
            }
            else {
                response.funkoPops = JSONdata;
                resolve(response);
            }
        });
    });
};
/**
 * Search on a list of funko and if the id is found, its deleted from the list
 * @param user - username
 * @param id Funko id to be deleted
 */
export const deleteFunko = (user, id) => {
    return new Promise((resolve, reject) => {
        let response = {
            success: true,
            error: ''
        };
        fs.readFile(path.join(process.cwd(), `/${user}/${user}.json`), (err, data) => {
            if (err) {
                response.success = false;
                response.error = 'Error reading the file';
                reject(response);
            }
            else {
                let JSONdata = JSON.parse(data.toString());
                let searchedID = JSON.parse(data.toString());
                searchedID = searchedID.filter(funko => {
                    return funko.id === id;
                });
                if (searchedID.length === 0) {
                    response.success = false;
                    response.error = `Error: funko with ID ${id} was not in the list`;
                    reject(response);
                }
                else {
                    JSONdata = JSONdata.filter(funko => {
                        return funko.id !== id;
                    });
                    fs.writeFile(path.join(process.cwd(), `/${user}/${user}.json`), JSON.stringify(JSONdata, null, 2), (err) => {
                        if (err) {
                            response.success = false;
                            response.error = 'Error writing on the file';
                            reject(response);
                        }
                        resolve(response);
                    });
                }
            }
        });
    });
};
/**
 * Searchs a id on a list and modifies the funko with that id if it exists
 * @param user - Username
 * @param funko Funkopop
 */
export const modifyFunko = (user, funko) => {
    return new Promise((resolve, reject) => {
        let response = {
            success: true,
            error: ''
        };
        fs.readFile(path.join(process.cwd(), `/${user}/${user}.json`), (err, data) => {
            if (err) {
                response.success = false;
                response.error = 'Error reading the file';
                reject(response);
            }
            else {
                let JSONdata = JSON.parse(data.toString());
                let searchedFunko = JSONdata.filter(Funko => {
                    return Funko.id === funko.id;
                });
                if (searchedFunko.length === 0) {
                    response.success = false;
                    response.error = `Error: the funko ${funko.id} is not registered on the list`;
                    reject(response);
                }
                else {
                    JSONdata = JSONdata.filter(Funko => {
                        return Funko.id !== funko.id;
                    });
                    JSONdata.push(funko);
                    fs.writeFile(path.join(process.cwd(), `/${user}/${user}.json`), JSON.stringify(JSONdata, null, 2), (err) => {
                        if (err) {
                            response.success = false;
                            response.error = 'Error writing the file';
                            reject(response);
                        }
                        resolve(response);
                    });
                }
            }
        });
    });
};
/**
 *
 * @param user - username
 * @param id Funko id
 */
export const showFunko = (user, id) => {
    return new Promise((resolve, reject) => {
        let response = {
            success: true,
            error: ''
        };
        fs.readFile(path.join(process.cwd(), `/${user}/${user}.json`), (err, data) => {
            if (err) {
                response.success = false;
                response.error = 'Error reading the file';
                reject(response);
            }
            else {
                let JSONdata = JSON.parse(data.toString());
                JSONdata = JSONdata.filter(funko => {
                    return funko.id === id;
                });
                if (JSONdata.length === 0) {
                    response.success = false;
                    response.error = `Error: the funko ${id} is not on the list`;
                    reject(response);
                }
                else {
                    response.funkoPops = JSONdata[0];
                    resolve(response);
                }
            }
        });
    });
};
