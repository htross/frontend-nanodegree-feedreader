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


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('have defined, non-empty URLs', function() {
            /*
             * For this test I am assuming that a valid URL
             * is a defined, non-empty string.
             */
            for(var i in allFeeds) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('have defined, non-empty name', function() {
            /*
             * For this test I am assuming that a valid name
             * is a defined, non-empty string.
             */
            for(var i in allFeeds) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });


    describe('The menu', function() {
        /* TODO: Write a new test suite named "The menu" */

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            //Confirm that the body tag has the menu-hidden class when the app starts
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('should toggle when clicked', function() {
            /*
             * Clicking the menu icon once should make it visible
             * Clicking it again should make it hidden again
             */
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });
        /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        //Ensures the asynchronous call finishes before running the test
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            })
        });

        it('should be able to load the feed', function() {
            /*
             * If the feed node has child nodes, then
             * the function completed its work
             */
            expect($('.feed').children().length).toBeGreaterThan(0);
        });
    });
        /* TODO: Write a new test suite named "New Feed Selection"
         /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
    describe('New Feed Selection', function() {

        //Holds children of feed dom element
        var initialChildren;
        var newChildren;

        //Holds the header titles for each feed
        var initialHeaderTitle;
        var newHeaderTitle;
        /*
         * Ensures that both calls complete sequentially before
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                initialChildren = $('.feed').children();
                initialHeaderTitle = $('.header-title');
                loadFeed(1, function() {
                    newChildren =  $('.feed').children();
                    newHeaderTitle = $('.header-title');
                    done();
                })
            })
        });

        it('should change data when a new feed is loaded', function() {
            //Confirms the header changes
            expect(initialHeaderTitle === newHeaderTitle).toBe(false);

            for (var i = 0; i < initialChildren.length; i++) {
                //Ensures the URL changes for each article
                expect(initialChildren[i].href === newChildren[i].href).toBe(false);
                //Ensures the inner html (including the title/paragraph text) changes for each article
                expect(initialChildren[i].innerHTML === newChildren[i].innerHTML).toBe(false);
            }
        });

    });

}());
