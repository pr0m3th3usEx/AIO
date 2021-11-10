# Dashboard 

## Setup

You will be able to start the project following the different steps below:

Add `.env` (which are templated with .env.example files) in both `dash_front` and `dash_back` folders.

After that, install the dependencies for both and front running

```bash
$ make build && make install # (Only one line of command, amazing! )
```

Once the dependencies installed, you can run the project:

```bash
$ make up # or make upd if you want it to run in background
```

In order to visualize your database, you can run the studio powered by *Prisma*:

```bash
make dash_studio # or make dash_studiod if you want it to in background
```

Some additional features for setup will be added later:

- Be able to seed the project for development: `make dash_seed`



## Contributors

- Thomas Michel (@pr0m3th3usEx)
- Pierre Dubosq (@PierreDubosq)