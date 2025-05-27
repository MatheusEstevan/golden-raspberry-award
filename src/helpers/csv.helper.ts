import * as fs from 'fs';
import * as csvParser from 'csv-parser';

export async function loadMoviesCSV(): Promise<any[]> {
  const results: any[] = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream('src/assets/Movielist.csv')
      .pipe(csvParser({separator: ';', headers: ['year', 'title', 'studios', 'producers', 'winner'], skipLines: 1}))
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
}
