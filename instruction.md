# local run
bundle exec jekyll serve --livereload
jekyll serve

JEKYLL_ENV=production jekyll build

# thinks to make changes

1. SEO
2. Pagination
3. Function to Share post to social media
4. Disques Comment
5. Categories Filter
6. visitors counter
7. minutes to read
8. number of comments

# To build your Jekyll site in production environment use the following command.
    JEKYLL_ENV=production bundle exec jekyll build

views count config:
    visited: #FF0000
    count: #2E3439


## Fresh installation
`sudo apt-get install ruby-full build-essential zlib1g-dev`

```bash
echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

`gem install jekyll bundler`

`jekyll --version`

`bundle update`

`bundle install`

`bundle exec jekyll serve --livereload`