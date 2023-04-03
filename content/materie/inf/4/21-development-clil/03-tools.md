---
title: Development Tools
type: lecture
weight: 30
summary: "When developing an application, the language and its ecosystem are not the only aspect to consider. In this lecture we discuss development tools which are those tools allowing developers to perform their job efficiently and effectively."
---

The variety of tools used in a application development projects is vast and
dependent on the product being developed. In this lecture, we discuss the tools
that are commonly in almost every project involving code development.

## Integrated Development Environment (IDE)
The term **IDE**, which stands for *Integrated Development Environment*, refers
to software primarily used to write code. However, this is just one aspect of an
IDE, and there are other features that should taken into considerations (see
[IDEs are more](#ides-are-more)).

In terms of effective code writing, an IDE should provide some essential features,
including:
* **Syntax highlighting**: The area where a developer types the code is styled
with colors and fonts according to the meaning of the words with respect to the
language used. For example, *keywords* of a programming language are colored
differently from comments. It is also common to use an *italic* font style for
comments.
* **Code completion**: The IDE suggests possible word completions that are valid.
For example, the IDE may suggest a variable name, or the right spell of a language
keyword. IDE usually also provides *snippets*, which are small pieces of commonly
used code, that the developer can customize to fit their needs.
* **Debugging features**: IDEs allow developers to perform *debugging* on software.
Such debugging features include breakpoints, step execution, variable inspection,
and more.
* **Code organizations**: IDEs allow developers to keep code organized and up
to professional standards (apparently, students are completed incapable of using
and leveraging such a wonderful feature, never heard about "Format Document"!?)
* **Documentation integration**: IDEs allow developers to inspect the language
and library documentation (*e.g.*, the API) without leaving the IDE. An overlay
window usually appears automatically on top of the code for which reference is
available.

### IDEs are more
IDEs are not just code editors. They are complete development environments with
features such as *version control integration*, collaboration tools, database
management, and more. IDEs can also be extended with plugins or add-ons to provide
additional functionality, such as integration with external tools or support for
specific languages.

Some features are often present in an good IDE.
* **Package manager integration** allows developer to manage the project and its
*dependencies* directly within the IDE.
* **Version control integration**  allows the developer to use the use the version
control system within the IDE. Often, the integrate managing of VCS is better than
the Command Line Interface (CLI) provided by the VCS itself. This is because the
IDE offers a more advanced GUI (Graphic User Interface).

### Popular IDE
Choosing an IDE is important when setting up the development environment, each
of the available IDE has advantages and disadvantages, which Wwe are not fully
discussing here.
* [**Visual Studio Code**](https://code.visualstudio.com/) its a free IDE
developed by Microsoft, it is designed around the concept of *extensions*. That
is, the IDE is a relatively small program to which extensions could be added for
more functionality. For example, an extension may contain features for Java
developing while another for Python developing.  Although VS Code is developed
by Microsoft, it supports all most operating systems (Windows, Mac OS, and Linux).
VS Code can even run on a browser, see, for example, [StackBlitz](https://stackblitz.com/).
* [**Jetbrains IDEs**](https://www.jetbrains.com/) are powerful tools for developer, 
the company has created several products for various needs. ull versions of the
softwares require a payed license, however some are freely available as *community*
version. Popular among Jetbrains' IDEs are [IntelliJ IDEA](https://www.jetbrains.com/idea)
for Java development and [PyCharm](https://www.jetbrains.com/pycharm) for Python
development.
* [**Visual Studio**](https://visualstudio.microsoft.com/) is the classical and
fully-featured IDE developed by Microsoft. It has a free version, but the full
one requires a payed license. It is important **not to confuse Visual Studio
and Visual Studio Code**, they are completely different products and not compatible.
* [**XCode**](https://developer.apple.com/xcode/) is the IDE created and distributed
by Apple for development in Mac OS (the only supported operating). XCode is indicated
for Mac OS and iOS applications, as it includes tools specifically created for this
purpose.

## Code versioning
Code is a *living* thing, it evolves continuously during and after the development
process. Commonly, multiple developers work on the same *codebase* at the same 
time. To make code *management* and *maintenance* easier, it is recommended to
use a **Version Control System (VSC)**, which is a software that tracking track
changes to the codebase.

By far, the most common VCS is [**Git**](https://git-scm.com/), which is available
as a package to install in any device. Git is also the *workhorse* of many online
versioning services like [GitHub](https://github.com/), [GitLab](https://gitlab.com/), and
[Bitbucket](https://bitbucket.org/) (to mention the most popular ones).

## Package manager
Any software that performs *non-trivial* functions is developed using libraries
and/or frameworks. These are usually included in a project as *packages* (also
called *modules*) stored in a central remote repository. Since packages are subject
to revisions and updates, managing them could become difficult. A **package
manager** is a software (often integrated in the IDE) that manages all packages
required by a project. Packet manager can be used to download, updated, remove,
index packages as well as more operations. The developer simply mentions a required
package in a proper file within the project and the package manager performs all
the needed operations automatically.

Package manager often differ between languages and frameworks. The following
list shows most commonly used package managers based on the language they are
coupled with.
* `npm` and `yarn` are common package manager for *Javascript* (both frontend and backend
projects) and *NodeJS* projects.
* `maven` and `gradle` are common package manager for *Java* projects.
* `pip` is a common package manager for *Python* projects.
* `nuget` is a common package manager for *C#* and *.NET* projects.

## Documentation
A software project doesn't only include source code, part of a well developed
application is its **documentation**. The documentation
may include one or both of
* *user guide* addressing the features of a shipped software;
* *API reference* addressing how the software (for example, a library) is used.

Part of the documentation are the comments within the source code. Comments
should be used on all code that is not *self-explaining*, in this case it may be
easier to understand it if a short explanation is given.

{{<exercise>}}
By now you should have more than one year of programming experience. To understand
the role of comments, find a code you wrote some time
ago (the further the better, however 6 months will do).

Look at the code using your IDE of choice and try to understand what it does.
You may end up asking yourself *Why did I wrote that?* or *What was I trying to
do with this piece of code?* If these questions come to you (and almost certainly,
they will), you are probably missing a comment that could have helped you
interpreting your own code.
{{</exercise>}}

{{<exercise>}}
Repeat the previous exercise of code this time by reviewing the code from one of
your a classmate. Is it clear? Suggest your mate a short comment that may have
helped you understand the code.
{{</exercise>}}

## Testing
Every software can contain some *bugs*, which are behaviors of the software
not expected or not conforming specifications. Once discovered, bugs
should be registered, possibly using a *bug tracking system*, and
hopefully solved. Solving bug, a process known as *debugging* is a time consuming,
boring, and often frustrating task. In short, debugging is better avoided.

To decrease the bugs present in a software, it is
helpful to perform **testing** of the application. Testing is the process
of running a software in known situations to see how the software behaves.
If the behavior is the expected one, then the test *passes* otherwise the
test *fails* and some sort *code refactor* is needed to get the expected
outcome. Two of the main type of testing are:
* **unit testing** that checks the correctness of a *unit* of software, usually
a function/method or a class and
* **integration testing** that checks that units of software interact as
expected once linked together.

## Deployment
The final step in development is the **deployment** of the software, this
step can also be aided by appropriate tools. One of the source of problems
in deployment (aside from the bugs in the source code) is the *environment*
on which the software is deployed. Complex softwares usually need a well
defined set of libraries, tools, and software installed in the environment.

The typical types of environment in which software is deployed are:
* **Physical machines**: the actual devices where the software is deployed;
* **Virtual machines**: an alternative to physical machines, the main advantage
is that the same physical machine can host several virtual machines, making
hardware management more efficient. Common virtualization software are
[VirtualBox](https://www.virtualbox.org/) and [VMWare](https://www.vmware.com/);
* **Containers**: a relatively recent technology that allow deployment
on virtual environments (easier to manage than virtual machines). Arguably, the
most common tool used for running containers is [Docker](https://www.docker.com/).