# Prof. Schimd Teaching Webiste

This is the source code of the teaching website of Prof. Schimd. Here you can find the source code and the configurations needed to run the site through [Hugo][1] and get it deployed. Furthermore, there are configuration file to deploy the site on GitHub and GitLab pages. The reminder of this file is dedicated to the explanation of how content is organized, most of this discussion will involve concepts from the [Hugo][1] framework, with which the reader should be familiar.

## Overall Structure

An overall description of how the content is organized within the source code (an organization which is reflected on the final deployed site, according to [Hugo][1] rules) is briefly described next, more details are given in the subsequent sections.

1. All "informational" content is placed within a *lecture* which has no further subsection.
2. Each *subject* is a sub-section of the "top-most" section `materie`.
3. In most cases, there is a first sub-section of subject for the *year* and a subsection of year for the *module*, within the module there is one or more *lectures*. For example the following represents the structure of the lecture *load and store* within the module *assembly* of the third year of the subject *sr*: `materie->sr->3->assembly->load-and-store`.
4. Exceptions to the above structure are possibile and will mostly skip *year* or *year and module*. In any case, the *lectures* must always be present as the last section.
5. A second top-most section, called *classes*, contains one subsection for each "active" class. The classes are *leaf bundle* pages and they should contain the link to the appropriate lectures and further material that is specific to the class (meaning that specific class of that specific years). The class front-matter should contain all the important information. This pages are also inserted in the navigation menu (using the [Hugo][1] feature from the front-matter of the page).
6. (TBD) A *past-years* section will contain data for classes of previous years. This data will be maintained as long as possibile, but is important to notice that content could go out-of-date very quickly and links could break at any time after re-adaptation and update of the website.

## Typical lecture content
A *lecture* will have an `_index.md` front metter with some summary text and link to all the important resources of the lecture. These resources will typically be:
* One (rarely more than one) page of content, *e.g.*, `load_and_store.md` where the text and the study material of the lecture should reside.
* One optional `quiz.md` page where a random selection of testing questions are presenting and evaluated automatically.
* A `questions.json` file containing the raw data for the quiz (*i.e.*, collection of questions with the keys to the solution this i parsed by `jquiz.js` script). The file could have a different name, but in this case the file name must be explicitly indicated in the bundle front matter using the `quiz_source` parameter (see below).
* An optional `exercise.md` where several exercises are contained and presented. Some of this exercises could have a key solution which can be consulted.
* An `exercises.json` file containing the raw data for the exercises (*i.e.*, a collection of exercises text, some of which will have the solution, this is parsed by `jexercises.js` script **which is not yet implemented**).
* An optional directory `img` containing all the images needed (especially in the content page). It is advisable that all images reside in this directory, although [Hugo][1] has no way to make this required.

### Parameters of the lecture
The website works properly if the requires information is set up during the conversion to the static version. This information is mostly contained in the front matters of the various files. Since this aspect is crucial, the documentation must be as precise and exhaustive as possibile, here we show the various front matter variables (also called *parameters* in [Hugo][1]) divided by page type according to the above structure

####  Lecture page (front matter of `_index.md`)
* `title`:
* `summary`:
* `type`: this should be set to the value `lecture` in order for the templates to work properly.
* `number`: the sequence number of the lecture within the module, if not set the `weight` variable is used.
* `weight`: the variable is used also by [Hugo][1] to sort the content. Unless `number` is set, this is also used to apply a number to the lecture 
* `repo`: contains a link to the repository (*e.g.*, GitHub) with the appropriate source code of the lecture.
* `quiz_source`: contains the `json` file name source of the quiz questions for the lecture.
* `exercise_source`: contains the `json` file name source of the exercises for the lecture.
* `unlisted`: if set prevents the page to be listed in the `list.html` template.


[1]: https://gohugo.io/
