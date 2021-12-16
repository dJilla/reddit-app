(function() {

	// listens to the subscribe button
	// when clicked, calls addSubredditToList();
	function listenToSubscribeButton() {

        //selectors
        let subbredditInput = document.querySelector('#subredditInput');
        let subscribe = document.querySelector('#subscribe');

        //addEventListener to subscribe button
        subscribe.addEventListener('click', event => {

            //call addSubredditToList function
            addSubredditToList(subbredditInput.value);

            console.log('clicked subscribe button');
        });
	}

    //call listenToSubscribeButton function
    listenToSubscribeButton();

	// actually adds the subreddit name to the <ul>
	function addSubredditToList(name) {

        //selectors
        let subreddits = document.querySelector('#subreddits');
        
        //create list item
        let li = document.createElement('li');

        //create link
        let a = document.createElement('a');

        //let link text = to name
        a.innerText = name;

        //set data-name = name
        a.setAttribute('data-name', name);

        //set href = current page
        a.setAttribute('href', '#');
        
        //append list item to unordered list
        subreddits.append(li);

        //append link to list item
        li.append(a);
	}

	// listens for a click on the subreddit list
	// when one is clicked, calls loadSubreddit with the name
	function listenToSubredditsClick() {

        //addEventListener to unordered
        subreddits.addEventListener('click', event => {
            
            //call loadSubreddit function on click
            loadSubreddit(event.target.getAttribute('data-name'));

            //call function clearExistingList when a subreddit is clicked
            clearExistingList();

            console.log('clicked post');
        });
	}

    //call listenToSubredditsClick function
    listenToSubredditsClick();

	// called when a subreddit is clicked from the list
	// should call fetch here
	function loadSubreddit(name) {

        //fetch API to subreddit clicked
        fetch(`https://www.reddit.com/r/${name}/.json`)
            .then((response) =>  response.json())
            .then((data) => {

                //loop through the array of posts
                for (let i = 0; i < data.data.children.length; i++) {

                    //call createPostElement each time loop runs
                    createPostElement(data.data.children[i].data.title, data.data.children[i].data.url);

                    console.log(data.data.children[i].data.title);

                    if (data.data.children[i].data.media !== null) {

                        console.log(data.data.children[i].data.media);
                    } else {

                        console.log('THIS POST HAS NO MEDIA');
                    }
                }
            });
	}

    //create an HTML element for a post on a given subreddit
    function createPostElement(title, url) {

        //create list item
        let li = document.createElement('li');

        //create link
        let a = document.createElement('a');

        //set innerText = title of post
        a.innerText = title;

        //set data-name attribute to title parameter
        a.setAttribute('data-name', title);

        //set href attribute to url parameter
        a.setAttribute('href', url);

        //append list item to unordered list 'posts'
        posts.append(li);

        //append url to list item
        li.append(a);

        return li;
    }

    //function listenToPostClick() {

    //    posts.addEventListener('click', event => {

    //        let link = data.data.attributes[1]

            //prevent page from refreshing while opening link
    //        event.preventDefault();

            //open the post in a new tab
    //        window.open(link, '_blank');

            console.log('post clicked');
    //    });        
    //}

    //call function listenToPostClick
    listenToPostClick();

	// clear the existing list of posts
	function clearExistingList() {

        //set posts' innerText to an empty string when function is called
        document.getElementById("posts").innerHTML = "";
	}

	// save the users subreddits to localstorage
	function saveSubredditsToLocalStorage() {

	}

	// read the users subreddits from localstorage
	function readSubredditsFromLocalStorage() {

	}
})();