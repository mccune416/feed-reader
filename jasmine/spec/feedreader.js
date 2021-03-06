/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('should have a defined URL', function() {
           for (i = 0; i < allFeeds.length; i++) {
              expect(allFeeds[i].url).toBeDefined();
              expect(allFeeds[i].url.length).not.toBe(0);
            };
         });


        /* Loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('should have a defined name', function() {
           for (i = 0; i < allFeeds.length; i++) {
              expect(allFeeds[i].name).toBeDefined();
              expect(allFeeds[i].name.length).not.toBe(0);
            };
         });
    });


    describe('The menu', function() {

      /* Ensures the menu element is hidden by default. */

       it('should have menu element hidden by default by having class menu-hidden', function() {
         expect($('body').hasClass('menu-hidden')).toEqual(true);
       });

       /* Ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
        describe('when clicked', function() {
          var menuIcon = $('.menu-icon-link');

          it('should display/hide the menu when clicked', function() {
            menuIcon.trigger('click');
            expect($('body').hasClass('menu-hidden')).toEqual(false);
            menuIcon.trigger('click');
            expect($('body').hasClass('menu-hidden')).toEqual(true);
          });

        });
    });

    describe('Initial Entries', function() {
      /* Ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       */
        beforeEach(function(done) {
          loadFeed(0, function() {
            done();
          });
        });

       it('has added entries', function() {
         expect($('.feed .entry').length).toBeGreaterThan(0);
       });
    });


    describe('New Feed Selection', function() {
      var firstEntry;
      var secondEntry;
      /* Ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       */
       beforeEach(function(done) {
         loadFeed(0, function() {
           firstEntry = $('.feed').html();
           loadFeed(1, function() {
             done();
           });
         });
       });

       it('should load new content', function() {
          secondEntry = $('.feed').html();
          expect(secondEntry).not.toEqual(firstEntry);
       });
    });
}());
