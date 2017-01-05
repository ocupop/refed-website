#ReFED Project

##Getting Started
1. Install Bundler: `gem install bundler`
2. Install ruby dependencies: `bundle install`
3. Install node dependencies: `npm install`
4. Install library components: `bower install`

##Daily Startup
1. `cd` to project directory
2. Start environment: `jekyll serve --watch` (will create `publish` directory)
3. Navigate to [http://localhost:4000/](http://localhost:4000/)


##Installing a New Component
1. Install library component using bower: `bower install [name] --save`
2. Migrate dependencies to src folder: `gulp bower`

##Publish
1. Push commits to bitbucket repository. All build and CI is dealt with using Cloudcannon. `git push origin master`
