let check = 0;
const array = [];
const allPosts = async (isSearch, inputText) => {
    let res;
    let data;
    let posts;
    if (isSearch && inputText) {
        res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${inputText}`);
        data = await res.json();
        posts = data.posts;
        console.log(posts);
    }
    else {
        res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
        data = await res.json();
        posts = data.posts;
        console.log(posts);
        check = 1;
        console.log('check is 1');
    }

    setTimeout(() => { loadingSpinner(false) }, 2000);

    const allPostContainer = document.getElementById('all-post-container');
    allPostContainer.innerHTML = ``;

    posts.forEach(post => {
        console.log(post);
        const badge = post.isActive ? 'badge-success' : 'badge-error';
        const newCard = document.createElement('div');
        newCard.classList.add('card', 'bg-gray-100', 'shadow-xl');
        newCard.innerHTML = `
        <div class="flex flex-col md:flex-row items-center">
        <div class="pt-6 md:pl-6 flex">
            <img class="min-h-20 min-w-20 h-24 rounded-xl" src=${post?.image}
                alt="">
            <div class="badge ${badge} badge-sm relative right-2"></div>
        </div>
        <div class="card-body space-y-3">
            <div class="flex gap-4 font-inter">
                <h3># <span>${post?.category}</span></h3>
                <h3>Author: <span>${post?.author.name}</span></h3>
            </div>
            <h2 class="card-title font-mulish text-xl font-extrabold">${post?.title}</h2>
            <p class="font-inter font-normal opacity-85">${post?.description}</p>
            <div class="card-actions justify-between items-center border-t-2 border-dashed pt-2">
                <div class="flex gap-4 items-center opacity-85">
                    <i class="fa-regular fa-message"></i>
                    <span>${post?.comment_count}</span>
                    <i class="fa-regular fa-eye"></i>
                    <span>${post?.view_count}</span>
                    <i class="fa-regular fa-clock"></i>
                    <span>${post?.posted_time} min</span>
                </div>
                <button onclick="markAsRead(${post.id})" class="btn rounded-full bg-green-600 text-white text-lg ${post.id}"><i
                        class="fa-regular fa-envelope"></i></button>
            </div>
        </div>
    </div>
        
        `;
        allPostContainer.appendChild(newCard);

    });

}

const latestPosts = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const latestdata = await res.json();
    console.log(latestdata);

    const latestPostContainer = document.getElementById('latest-post-container');

    latestdata.forEach(data => {
        console.log(data);
        const newCard = document.createElement('div');
        newCard.classList.add('card', 'bg-base-100', 'shadow-xl');
        newCard.innerHTML = `
        <figure><img class="w-80" src=${data?.cover_image}
                            alt="Shoes" />
                    </figure>
                    <div class="card-body">
                        <p><i class="fa-regular fa-calendar"></i><span class="opacity-85"> ${data?.author?.posted_date || "No publish date"}</span></p>
                        <h2 class="font-extrabold text-lg">${data?.title}</h2>
                        <p class="font-normal opacity-85">${data?.description}
                        </p>
                        <div class="card-actions flex gap-4 items-center">
                            <div>
                                <img class="h-11 rounded-full"
                                    src=${data?.profile_image} alt="">
                            </div>
                            <div>
                                <h2 class="font-bold "">${data?.author?.name}</h2>
                                <p class=" font-normal opacity-85">${data?.author?.designation || "Unknown"}</p>
                            </div>
                        </div>
                    </div>
        
        `;
        latestPostContainer.appendChild(newCard);

    })
}

let count = 0;
const markAsRead = async (id) => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const posts = data.posts;

    const markAsReadContainer = document.getElementById('mark-as-read-container');
    posts.forEach(post => {
        if (post.id === id) {
            count++;
            const newCard = document.createElement('div');
            newCard.classList.add('bg-white', 'flex', 'justify-between', 'p-4', 'rounded-xl');
            newCard.innerHTML = `
            <h2 class="font-mulish font-bold text-xl w-4/5">${post.title}</h2>
            <h3 class="font-inter font-normal "><i class="fa-regular fa-eye"></i><span>${post.view_count}</span>
            </h3>            
            `
            markAsReadContainer.appendChild(newCard);

            document.getElementById('mark-as-read-number').innerText = `(${count})`;
        }

    })

}


const search = async () => {
    const input = document.getElementById('input');
    const inputText = input.value;
    loadingSpinner(true);
    allPosts(true, inputText);
    input.value = '';
}

const loadingSpinner = (isLoading) => {
    const spinner = document.getElementById('spinner');
    if (isLoading) {
        spinner.classList.remove('hidden');
    }
    else {
        spinner.classList.add('hidden');
    }
}