import express from 'express';

export function main(): void {
  const app = express();
  app.use(express.json());

  app.post('/sync', (req, res) => {
    console.log(req.body);
    res.json({ message: 'success' });
  });

  const port = 3000;
  app.listen(port, () => {
    return console.log(`Express is listening at http://0.0.0.0:${port}`);
  });
}
main();
