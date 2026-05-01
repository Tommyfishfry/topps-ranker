// movies/movies.js
// 66 films across 6 decades

window.MOVIES = [

  // ── 1970s ──────────────────────────────────────────────────────────────────
  { id: 'star-wars',              title: 'Star Wars',                        year: 1977, decade: '1970s', color: '#8B0000' },
  { id: 'jaws',                   title: 'Jaws',                             year: 1975, decade: '1970s', color: '#8B0000' },
  { id: 'the-godfather',          title: 'The Godfather',                    year: 1972, decade: '1970s', color: '#8B0000' },
  { id: 'the-godfather-ii',       title: 'The Godfather Part II',            year: 1974, decade: '1970s', color: '#8B0000' },
  { id: 'grease',                 title: 'Grease',                           year: 1978, decade: '1970s', color: '#8B0000' },
  { id: 'the-exorcist',           title: 'The Exorcist',                     year: 1973, decade: '1970s', color: '#8B0000' },
  { id: 'rocky',                  title: 'Rocky',                            year: 1976, decade: '1970s', color: '#8B0000' },
  { id: 'alien',                  title: 'Alien',                            year: 1979, decade: '1970s', color: '#8B0000' },
  { id: 'apocalypse-now',         title: 'Apocalypse Now',                   year: 1979, decade: '1970s', color: '#8B0000' },
  { id: 'saturday-night-fever',   title: 'Saturday Night Fever',             year: 1977, decade: '1970s', color: '#8B0000' },
  { id: 'close-encounters',       title: 'Close Encounters of the Third Kind', year: 1977, decade: '1970s', color: '#8B0000' },

  // ── 1980s ──────────────────────────────────────────────────────────────────
  { id: 'et',                     title: 'E.T. the Extra-Terrestrial',       year: 1982, decade: '1980s', color: '#00008B' },
  { id: 'empire-strikes-back',    title: 'The Empire Strikes Back',          year: 1980, decade: '1980s', color: '#00008B' },
  { id: 'return-of-the-jedi',     title: 'Return of the Jedi',               year: 1983, decade: '1980s', color: '#00008B' },
  { id: 'raiders-of-the-lost-ark', title: 'Raiders of the Lost Ark',        year: 1981, decade: '1980s', color: '#00008B' },
  { id: 'the-shining',            title: 'The Shining',                      year: 1980, decade: '1980s', color: '#00008B' },
  { id: 'scarface',               title: 'Scarface',                         year: 1983, decade: '1980s', color: '#00008B' },
  { id: 'batman-1989',            title: 'Batman',                           year: 1989, decade: '1980s', color: '#00008B' },
  { id: 'ghostbusters',           title: 'Ghostbusters',                     year: 1984, decade: '1980s', color: '#00008B' },
  { id: 'beverly-hills-cop',      title: 'Beverly Hills Cop',                year: 1984, decade: '1980s', color: '#00008B' },
  { id: 'back-to-the-future',     title: 'Back to the Future',               year: 1985, decade: '1980s', color: '#00008B' },
  { id: 'top-gun',                title: 'Top Gun',                          year: 1986, decade: '1980s', color: '#00008B' },
  { id: 'die-hard',               title: 'Die Hard',                         year: 1988, decade: '1980s', color: '#00008B' },
  { id: 'ferris-bueller',         title: "Ferris Bueller's Day Off",         year: 1986, decade: '1980s', color: '#00008B' },

  // ── 1990s ──────────────────────────────────────────────────────────────────
  { id: 'titanic',                title: 'Titanic',                          year: 1997, decade: '1990s', color: '#4B0082' },
  { id: 'jurassic-park',          title: 'Jurassic Park',                    year: 1993, decade: '1990s', color: '#4B0082' },
  { id: 'forrest-gump',           title: 'Forrest Gump',                     year: 1994, decade: '1990s', color: '#4B0082' },
  { id: 'the-lion-king',          title: 'The Lion King',                    year: 1994, decade: '1990s', color: '#4B0082' },
  { id: 'goodfellas',             title: 'Goodfellas',                       year: 1990, decade: '1990s', color: '#4B0082' },
  { id: 'silence-of-the-lambs',   title: 'The Silence of the Lambs',        year: 1991, decade: '1990s', color: '#4B0082' },
  { id: 'schindlers-list',        title: "Schindler's List",                 year: 1993, decade: '1990s', color: '#4B0082' },
  { id: 'home-alone',             title: 'Home Alone',                       year: 1990, decade: '1990s', color: '#4B0082' },
  { id: 'the-sixth-sense',        title: 'The Sixth Sense',                  year: 1999, decade: '1990s', color: '#4B0082' },
  { id: 'independence-day',       title: 'Independence Day',                 year: 1996, decade: '1990s', color: '#4B0082' },
  { id: 'terminator-2',           title: 'Terminator 2: Judgment Day',       year: 1991, decade: '1990s', color: '#4B0082' },
  { id: 'men-in-black',           title: 'Men in Black',                     year: 1997, decade: '1990s', color: '#4B0082' },
  { id: 'the-matrix',             title: 'The Matrix',                       year: 1999, decade: '1990s', color: '#4B0082' },
  { id: 'pulp-fiction',           title: 'Pulp Fiction',                     year: 1994, decade: '1990s', color: '#4B0082' },
  { id: 'aladdin',                title: 'Aladdin',                          year: 1992, decade: '1990s', color: '#4B0082' },
  { id: 'saving-private-ryan',    title: 'Saving Private Ryan',              year: 1998, decade: '1990s', color: '#4B0082' },

  // ── 2000s ──────────────────────────────────────────────────────────────────
  { id: 'the-dark-knight',        title: 'The Dark Knight',                  year: 2008, decade: '2000s', color: '#014421' },
  { id: 'avatar',                 title: 'Avatar',                           year: 2009, decade: '2000s', color: '#014421' },
  { id: 'spider-man',             title: 'Spider-Man',                       year: 2002, decade: '2000s', color: '#014421' },
  { id: 'lotr-return-of-the-king', title: 'The Lord of the Rings: Return of the King', year: 2003, decade: '2000s', color: '#014421' },
  { id: 'harry-potter-1',         title: "Harry Potter and the Sorcerer's Stone", year: 2001, decade: '2000s', color: '#014421' },
  { id: 'finding-nemo',           title: 'Finding Nemo',                     year: 2003, decade: '2000s', color: '#014421' },
  { id: 'the-incredibles',        title: 'The Incredibles',                  year: 2004, decade: '2000s', color: '#014421' },
  { id: 'wall-e',                 title: 'WALL-E',                           year: 2008, decade: '2000s', color: '#014421' },
  { id: 'gladiator',              title: 'Gladiator',                        year: 2000, decade: '2000s', color: '#014421' },
  { id: 'no-country-for-old-men', title: 'No Country for Old Men',           year: 2007, decade: '2000s', color: '#014421' },
  { id: 'the-departed',           title: 'The Departed',                     year: 2006, decade: '2000s', color: '#014421' },
  { id: 'there-will-be-blood',    title: 'There Will Be Blood',              year: 2007, decade: '2000s', color: '#014421' },

  // ── 2010s ──────────────────────────────────────────────────────────────────
  { id: 'avengers-endgame',       title: 'Avengers: Endgame',                year: 2019, decade: '2010s', color: '#2F2F2F' },
  { id: 'black-panther',          title: 'Black Panther',                    year: 2018, decade: '2010s', color: '#2F2F2F' },
  { id: 'dark-knight-rises',      title: 'The Dark Knight Rises',            year: 2012, decade: '2010s', color: '#2F2F2F' },
  { id: 'frozen',                 title: 'Frozen',                           year: 2013, decade: '2010s', color: '#2F2F2F' },
  { id: 'inception',              title: 'Inception',                        year: 2010, decade: '2010s', color: '#2F2F2F' },
  { id: 'mad-max-fury-road',      title: 'Mad Max: Fury Road',               year: 2015, decade: '2010s', color: '#2F2F2F' },
  { id: 'get-out',                title: 'Get Out',                          year: 2017, decade: '2010s', color: '#2F2F2F' },
  { id: 'interstellar',           title: 'Interstellar',                     year: 2014, decade: '2010s', color: '#2F2F2F' },
  { id: 'wolf-of-wall-street',    title: 'The Wolf of Wall Street',          year: 2013, decade: '2010s', color: '#2F2F2F' },
  { id: 'parasite',               title: 'Parasite',                         year: 2019, decade: '2010s', color: '#2F2F2F' },

  // ── 2020s ──────────────────────────────────────────────────────────────────
  { id: 'top-gun-maverick',       title: 'Top Gun: Maverick',                year: 2022, decade: '2020s', color: '#8B6914' },
  { id: 'oppenheimer',            title: 'Oppenheimer',                      year: 2023, decade: '2020s', color: '#8B6914' },
  { id: 'barbie',                 title: 'Barbie',                           year: 2023, decade: '2020s', color: '#8B6914' },
  { id: 'dune-part-two',          title: 'Dune: Part Two',                   year: 2024, decade: '2020s', color: '#8B6914' },

];
