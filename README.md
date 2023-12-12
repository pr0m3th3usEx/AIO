# AIO

AIO is a all-in-one services dashboard. Thanks to AIO, you will be able to gather several information about the current services you are using in a unique place.

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

In order to visualize your database, you can run the studio powered by _Prisma_:

```bash
make dash_studio # or make dash_studiod if you want it to in background
```

Some additional features for setup will be added later:

- Be able to seed the project for development: `make dash_seed`

## Services

### Epitech Intra

- Widget that fetch project and display due date

### Weather

- Widget that display current weather and previsions according to the selected city

### Google Translate

- Widget to translate from a source language to another

### Cryptocurrency

- Widget to display information about a specified crypto

### Twitter

- Widget that display the last tweets from a specified user

### Subreddit

- Display Posts from a specific Subreddit

## Contributors

- Thomas Michel (@pr0m3th3usEx)
- Pierre Dubosq (@PierreDubosq)
