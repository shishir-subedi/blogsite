# Project Setup

```bash
sudo apt-get update`
sudo apt-get install ruby-full build-essential zlib1g-dev`
echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
sudo apt-get install rubygems
gem install jekyll -v 3.9.0 --verbose
gem install bundler --verbose
```

## Install jekyll dependencies
```bash
bundle install
```

## local run
```bash
bundle exec jekyll serve --livereload
jekyll serve

# for production build
JEKYLL_ENV=production jekyll build
```

## Things to make changes

1. SEO
2. Pagination
3. Function to Share post to social media
4. Disques Comment
5. Categories Filter
6. visitors counter
7. minutes to read
8. number of comments

## To build your Jekyll site in production environment use the following command.

    JEKYLL_ENV=production bundle exec jekyll build

