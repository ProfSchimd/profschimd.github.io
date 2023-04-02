---
title: Development Tools
type: lecture
weight: 30
summary: "When developing an application, the language and its ecosystem are not the only aspect to consider. In this lecture we discuss development tools which are those tools allowing developers to perform their job efficiently and effectively."
---

The variety of tools that are used in a typical application development project
is vast and dependent on the actual product to develope. In this lecture, we
discuss those tools that are likely to be used in almost every project involving
some sort of code development.

## Integrated Development Environment (IDE)
The term **IDE** which refers to *Integrated Development Environment* is used to
refer to a software that is primarily, but not solely, used to write actual code.
It should be emphasized, however, that this is just one aspect of an IDE that must
be taken into considerations (see [IDEs are more](#ides-are-more)).

In terms of effective code writing an IDE should provide some essential features,
some of which are briefly discussed next.
* **Syntax highlighting** the area where a developer types the code is styled
(colors and fonts are adjusted) according to the meaning of the words with respect
to the language used. For example, *keywords* of a programming language are colored
so to be distinguished from, say, comments. Sometimes also the type of font is
changed, for example it is common to have comments in an *italic* style (besides
being colored differently from the rest of the code).
* **Code completion** the IDE suggests to the developer possible word completions
that are valid. For example, the IDE may suggest a variable name, or the right
spell of a language keyword. IDE usually also provides *snippets*, which are small
pieces of code that are commonly used, a snippet is usually a *template* so that
the developer can change some of its content to fit his/her needs.
* **Debugging features** allows developers to perform *debugging* on a software,
this features include: breakpoints, step execution, variable inspection, and many
more.
* **Code organizations** allows the developer to keep the code organized and up
to professional standards (apparently, students are completed incapable of using
and leveraging such a wonderful feature, never heard about "Format Document"!?)
* **Documentation integration** allows developers to inspect the language and
library documentation (*e.g.*, the API) without leaving the IDE. Usually, an
overlay window appears automatically on top of the piece of code for which reference
is available.

### IDEs are more
Some features are often present in an good IDE.
* **Package manager integration** allows developer to manage the project and its
*dependencies* directly within the IDE.
* **Version control integration**  allows the developer to use the use the version
control system within the IDE. Often, the integrate managing of VCS is better than
the Command Line Interface (CLI) provided by the VCS itself. This is because the
IDE offers a more advanced GUI (Graphic User Interface).

### Popular IDE
Choosing an IDE is an important step in setting up the development environment,
nowadays there are several possible choices each of which has advantages and
disadvantages. We are not going to discuss these here, we only provide a brief
list of the most popular IDE.
* [**Visual Studio Code**](https://code.visualstudio.com/) its a free IDE
developed by Microsoft which is based on the idea of *extensions*. That is, the
IDE is a relatively small program to which *extensions* can be added to provide
functionality. For example, an extension may enable features for developing in
Java and another for developing in Python. Even though VS Code is developed by
Microsoft, it can run on most popular Desktop operating systems (Windows, Mac OS,
and Linux). Furthermore, VS Code can be run on a browser, see, for example,
[StackBlitz](https://stackblitz.com/).
* [**Jetbrains IDEs**](https://www.jetbrains.com/) are powerful tools for developer, the company has created
several tools to target various development needs. The full versions of these
IDEs need a payed license, however some come with a *community* version that can
be used for free. The most popular among free IDEs are [IntelliJ IDEA](https://www.jetbrains.com/idea)
for Java development and [PyCharm](https://www.jetbrains.com/pycharm) for Python
development.
* [**Visual Studio**](https://visualstudio.microsoft.com/) is the classical and
fully-featured IDE developed by Microsoft. It has a free version, but the full
one requires a payed license. It is important **not to confuse Visual Studio
and Visual Studio Code**, they are completely different IDE and they are note
compatible.
* [**XCode**](https://developer.apple.com/xcode/) is the IDE created and distributed
by Apple to develope in Mac OS (the only operating system on which it can run).
It is particularly indicated when developing Mac OS or iOS applications as it
contains various tools specifically created for this purpose.

## Code versioning
Code is a *living* thing, it evolves continuously during the development process
and even after the *deployment*. Furthermore, it is common to have multiple
developers working on the same *codebase* at the same time. To make code management
and *maintenance* easier, it is better to adopt a **version control system (VSC)**
which is a software that keeps track of changes in the codebase.

By far, the most common VCS is [**Git**](https://git-scm.com/) which is available
as a package to install in any device. Git is also the *workhorse* of many online
services like [GitHub](https://github.com/), [GitLab](https://gitlab.com/), and
[Bitbucket](https://bitbucket.org/) (to mention the most popular ones).

Often a VCS is organized into a *server* and a *client* software, which are usually
installed on different machines (this is, by no means, a requirement). This allows
for remote access to the codebase, allowing better synchronization (for example I
can work everywhere, without the needing the VCS server in my development workstation).

## Package manager
Any software that performs *non-trivial* functions is developed using some sort
of library and/or framework. These are usually included in a project in form of
a *package* (sometimes called *module*) that are stored in a central repository.

Managing all the packages tha a project needs may become a difficult task because
packages are subject to revisions and updating. A **package manager** is a software
(maybe integrated by the IDE) that keeps track of all packages needed by a project.
Keeping tracks here means that a packet manager can be used to: download, updated,
remove, index, ... all the needed packages. Usually, the developer simply includes
a package in the project by declaring it in a proper project file and the package
manager adjusts the project according to the content of such a file.

Package manager are often different based on the language and/or framework used
to develop the application. The following list shows the most common such package
managers based on the language/framework they are best coupled with.
* `npm` and `yarn` are common package manager for Javascript (both forntend and backend
projects) and NodeJS projects.
* `maven` and `gradle` are common package manager for Java projects.
* `pip` is a common package manager for Python projects.
* `nuget` is a common package manager for C# and .NET projects.

## Documentation
A software project doesn't only include source code, part of a well developed
application is the **documentation**. Based on the final product the documentation
may include one or both of
* *user guide* addressing the features of the software (commonly present in a
"stand-alone" application);
* *API reference* addressing how the software (usually a library or a framework)
can be used.

Part of the documentation are the comment written within the source code. Comments
are used to address parts of the code that are not *self-explaining* and may be
better understood with a little explanation.

{{<exercise>}}
By now you should have at least one year of programming experience, to understand
how useful a comment could be try to find a source code that you wrote some time
ago (the further the better, but 6 months could be enough).

Once you have your code opened up in an IDE try to understand what it does and
how it does it. At some point you may ask yourself *Why did I wrote that?* or
*What was I trying to do with this piece of code?* If these questions come to
you (and almost certainly, they will), then you may appreciate how a good comment
written there could have helped you better interpreting your own code.
{{</exercise>}}

{{<exercise>}}
Repeat the previous exercise of code reviewing, this time however, ask an old
piece code to a classmate. Is it all clear? Suggest to your mate where e short
comment may have helped understanding the code better.
{{</exercise>}}

## Testing
Every software can contain some *bug*, which are behaviors of the software that
are not expected or not conforming to what was intended. Once discovered, bugs
are registered possibly using a *bug tracking system* (a dedicated software) and
eventually solved. Solving bug, a process known as *debugging* is a time consuming
task, arguably not fan, it may be extremely frustrating and is better avoided.

An attempt to lower the amount of bug present in a software, it can be very
helpful to perform formal **testing** of an application. Testing is a process
of running a software through known situations with the goal of discovering
unexpected behaviors (bugs). Testing usually involves writing a piece of software
that *tests* another piece of software. Two main type of testing are
* **unit testing** checks the correctness of a *unit* of software, usually a
function/method or a class;
* **integration testing** checks that various units of software (possibly tested
through unit testing) interact as expected once put together.

## Deployment
The final step in development is the **deployment** of the software, this
step can also be eased by using the appropriate tools.
* **Physical machines** are actual devices where the software is deployed.
* **Virtual machines** represent an alternative to physical machines, the
main advantage is that the same physical machine can host several virtual
machines, making hardware management more efficient. Common virtualization
software are [VirtualBox](https://www.virtualbox.org/) and
[VMWare](https://www.vmware.com/).
* **Containers** are a relatively recent technology that allow deployment
on a virtual environment. By far, the most common tool used for running
containers is [Docker](https://www.docker.com/).