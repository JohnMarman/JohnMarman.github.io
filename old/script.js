const items = document.querySelectorAll('.items');

const contents = [
  `<div class="main-content" id="main-image">
				<div class="content-preview">
					<div class="holder">
						<div class="main-image">
							<img src="https://i.kym-cdn.com/entries/icons/mobile/000/025/155/stock.jpg"/>
						</div>
						<ol class="image-selection">
							<img src="https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e.jpg"/>
							<img src="https://cdn.business2community.com/wp-content/uploads/2015/10/42454567_m.jpg.jpg"/>
							<img src="https://www.atomix.com.au/media/2017/07/StockPhotoBanner.jpg"/>
							<img src="https://cxl.com/wp-content/uploads/2014/10/stock-photo-female-customer-support-operator-with-headset-and-smiling-149580755.jpg"/>
							<img src="https://i.kym-cdn.com/photos/images/newsfeed/000/954/161/b3a.jpg"/>
							<img src="https://knowtechie.com/wp-content/uploads/2019/11/dark-stock-photos-main-kt.jpg"/>
							<img src="https://static.boredpanda.com/blog/wp-content/uploads/2017/12/funny-weird-wtf-stock-photos-19-5a3926af95d9d__700.jpg"/>
							<img src="https://i.pinimg.com/236x/72/dc/6a/72dc6a6760c32e03e4f0a2922054409a--stock-image-really-funny.jpg"/>
						</ol>
					</div>
				</div>
				<div class="content-details">
					<div class="content-title">
						Ludum Factorum
					</div>
					<div class="stack-holder">
						<div class="stack">
							Stack:
						</div>
						<ol class="stack-items">
							<li>
								Unity
							</li>
							<li>
								C#
							</li>
						</ol>
					</div>
					<div class="content-description">
						description
					</div>
					<div class="content-process">
						process
					</div>
				</div>
			</div>`,

  `<div class="main-content" id="main-image">
				<div class="content-preview">
					<div class="holder">
						<div class="main-image">
							<img src="https://i.kym-cdn.com/entries/icons/mobile/000/025/155/stock.jpg"/>
						</div>
						<ol class="image-selection">
							<img src="https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e.jpg"/>
							<img src="https://cdn.business2community.com/wp-content/uploads/2015/10/42454567_m.jpg.jpg"/>
							<img src="https://www.atomix.com.au/media/2017/07/StockPhotoBanner.jpg"/>
							<img src="https://cxl.com/wp-content/uploads/2014/10/stock-photo-female-customer-support-operator-with-headset-and-smiling-149580755.jpg"/>
							<img src="https://i.kym-cdn.com/photos/images/newsfeed/000/954/161/b3a.jpg"/>
							<img src="https://knowtechie.com/wp-content/uploads/2019/11/dark-stock-photos-main-kt.jpg"/>
							<img src="https://static.boredpanda.com/blog/wp-content/uploads/2017/12/funny-weird-wtf-stock-photos-19-5a3926af95d9d__700.jpg"/>
							<img src="https://i.pinimg.com/236x/72/dc/6a/72dc6a6760c32e03e4f0a2922054409a--stock-image-really-funny.jpg"/>
						</ol>
					</div>
				</div>
				<div class="content-details">
					<div class="content-title">
						Automated Schedule
					</div>
					<div class="stack-holder">
						<div class="stack">
							Stack:
						</div>
						<ol class="stack-items">
							<li>
								Google Sheets
							</li>
							<li>
								JavaScript
							</li>
						</ol>
					</div>
					<div class="content-description">
						description
					</div>
					<div class="content-process">
						process
					</div>
				</div>
			</div>`,

  `<div class="main-content" id="main-image">
				<div class="content-preview">
					<div class="holder">
						<div class="main-image">
							<img src="https://i.kym-cdn.com/entries/icons/mobile/000/025/155/stock.jpg"/>
						</div>
						<ol class="image-selection">
							<img src="https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e.jpg"/>
							<img src="https://cdn.business2community.com/wp-content/uploads/2015/10/42454567_m.jpg.jpg"/>
							<img src="https://www.atomix.com.au/media/2017/07/StockPhotoBanner.jpg"/>
							<img src="https://cxl.com/wp-content/uploads/2014/10/stock-photo-female-customer-support-operator-with-headset-and-smiling-149580755.jpg"/>
							<img src="https://i.kym-cdn.com/photos/images/newsfeed/000/954/161/b3a.jpg"/>
							<img src="https://knowtechie.com/wp-content/uploads/2019/11/dark-stock-photos-main-kt.jpg"/>
							<img src="https://static.boredpanda.com/blog/wp-content/uploads/2017/12/funny-weird-wtf-stock-photos-19-5a3926af95d9d__700.jpg"/>
							<img src="https://i.pinimg.com/236x/72/dc/6a/72dc6a6760c32e03e4f0a2922054409a--stock-image-really-funny.jpg"/>
						</ol>
					</div>
				</div>
				<div class="content-details">
					<div class="content-title">
						test3
					</div>
					<div class="stack-holder">
						<div class="stack">
							Stack:
						</div>
						<ol class="stack-items">
							<li>
								test
							</li>
							<li>
								test
							</li>
						</ol>
					</div>
					<div class="content-description">
						description
					</div>
					<div class="content-process">
						process
					</div>
				</div>
			</div>`,

  `<div class="main-content" id="main-image">
				<div class="content-preview">
					<div class="holder">
						<div class="main-image">
							<img src="https://i.kym-cdn.com/entries/icons/mobile/000/025/155/stock.jpg"/>
						</div>
						<ol class="image-selection">
							<img src="https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e.jpg"/>
							<img src="https://cdn.business2community.com/wp-content/uploads/2015/10/42454567_m.jpg.jpg"/>
							<img src="https://www.atomix.com.au/media/2017/07/StockPhotoBanner.jpg"/>
							<img src="https://cxl.com/wp-content/uploads/2014/10/stock-photo-female-customer-support-operator-with-headset-and-smiling-149580755.jpg"/>
							<img src="https://i.kym-cdn.com/photos/images/newsfeed/000/954/161/b3a.jpg"/>
							<img src="https://knowtechie.com/wp-content/uploads/2019/11/dark-stock-photos-main-kt.jpg"/>
							<img src="https://static.boredpanda.com/blog/wp-content/uploads/2017/12/funny-weird-wtf-stock-photos-19-5a3926af95d9d__700.jpg"/>
							<img src="https://i.pinimg.com/236x/72/dc/6a/72dc6a6760c32e03e4f0a2922054409a--stock-image-really-funny.jpg"/>
						</ol>
					</div>
				</div>
				<div class="content-details">
					<div class="content-title">
						test4
					</div>
					<div class="stack-holder">
						<div class="stack">
							Stack:
						</div>
						<ol class="stack-items">
							<li>
								test
							</li>
							<li>
								test
							</li>
						</ol>
					</div>
					<div class="content-description">
						description
					</div>
					<div class="content-process">
						process
					</div>
				</div>
			</div>`
];

items.forEach((item, index) => {
    item.addEventListener('click', function() {
        const mainContent = document.querySelector('.main-content');

        // Slide the current main content out to the right
        mainContent.style.transition = "transform 0.5s ease";
        mainContent.style.transform = "translateX(100%)"; 

        setTimeout(() => {
            // Update content
            mainContent.innerHTML = contents[index];

            // Reset the main content's position to the left
            mainContent.style.transition = "none";
            mainContent.style.transform = "translateX(-100%)"; 

            const imagesInSelection = document.querySelectorAll('.image-selection img');
            const mainImageContainer = document.querySelector('.main-image');
            const mainImage = mainImageContainer.querySelector('img');

            imagesInSelection.forEach(image => {
                image.addEventListener('mouseenter', function(e) {
                    e.stopPropagation(); // Prevent the event from propagating to the main image
                    mainImage.src = image.src;
                });

                // Adding the functionality to expand the image on click
                image.addEventListener('click', function(e) {
                    e.stopPropagation(); // Prevent the event from propagating to the main image
                    const expandedWrapper = document.getElementById('expanded-wrapper');
            
                    if (expandedWrapper.classList.contains('active')) {
                        expandedWrapper.innerHTML = ''; // Remove the cloned image from the wrapper
                        expandedWrapper.classList.remove('active');
                    } else {
                        const clonedImage = image.cloneNode(true);
                        clonedImage.classList.add('expanded');
                        expandedWrapper.appendChild(clonedImage); // Add the cloned image to the wrapper
                        expandedWrapper.classList.add('active');

                        // Add an event listener to the cloned image to close it when clicked
                        clonedImage.addEventListener('click', function() {
                            expandedWrapper.innerHTML = '';
                            expandedWrapper.classList.remove('active');
                        });
                    }
                });
            });

            const expandedWrapper = document.getElementById('expanded-wrapper');

            mainImageContainer.addEventListener('click', function() {
                if (expandedWrapper.classList.contains('active')) {
                    expandedWrapper.innerHTML = ''; // Remove the cloned image from the wrapper
                    expandedWrapper.classList.remove('active');
                } else {
                    const clonedImage = mainImage.cloneNode(true);
                    clonedImage.classList.add('expanded');
                    expandedWrapper.appendChild(clonedImage); // Add the cloned image to the wrapper
                    expandedWrapper.classList.add('active');

                    // Add an event listener to the cloned image to close it when clicked
                    clonedImage.addEventListener('click', function() {
                        expandedWrapper.innerHTML = '';
                        expandedWrapper.classList.remove('active');
                    });
                }
            });

            // Slide the new main content in from the left
            setTimeout(() => {
                mainContent.style.transition = "transform 0.5s ease";
                mainContent.style.transform = "translateX(0%)"; 
            }, 50); 

        }, 500); 
    });
});
