# AMICULUM Digital CSS / Sass Styleguide

*Based on the [Airbnb CSS Style Guide](https://github.com/airbnb/css)*

## Table of Contents

  1. [Terminology](#terminology)
    - [Rule Declaration](#rule-declaration)
    - [Selectors](#selectors)
    - [Properties](#properties)
  1. [CSS](#css)
    - [Formatting](#formatting)
    - [Comments](#comments)
    - [OOCSS, BEM and Namespaces](#oocss-bem-and-namespaces)
    - [ID Selectors](#id-selectors)
    - [JavaScript hooks](#javascript-hooks)
  1. [Sass](#sass)
    - [Structure](#itcss)
    - [Syntax](#syntax)
    - [Ordering](#ordering-of-property-declarations)
    - [Mixins](#mixins)
    - [Placeholders](#placeholders)
    - [Nested selectors](#nested-selectors)

## Terminology

### Rule declaration

A “rule declaration” is the name given to a selector (or a group of selectors) with an accompanying group of properties. Here's an example:

```css
.listing {
  font-size: 18px;
  line-height: 1.2;
}
```

### Selectors

In a rule declaration, “selectors” are the bits that determine which elements in the DOM tree will be styled by the defined properties. Selectors can match HTML elements, as well as an element's class, ID, or any of its attributes. Here are some examples of selectors:

```css
.my-element-class {
  /* ... */
}

[aria-hidden] {
  /* ... */
}
```

### Properties

Finally, properties are what give the selected elements of a rule declaration their style. Properties are key-value pairs, and a rule declaration can contain one or more property declarations. Property declarations look like this:

```css
/* some selector */ {
  background: #f1f1f1;
  color: #333;
}
```

## CSS

### Formatting

* Use soft tabs (2 spaces) for indentation
* Prefer dashes over camelCasing in class names. Underscores are OK if you're using BEM (see [OOCSS and BEM](#oocss-and-bem) below).
* Do not use ID selectors
* When using multiple selectors in a rule declaration, give each selector its own line.
* Put a space before the opening brace `{` in rule declarations
* In properties, put a space after, but not before, the `:` character.
* Put closing braces `}` of rule declarations on a new line
* Put blank lines between rule declarations

**Bad**

```css
.avatar{
    border-radius:50%;
    border:2px solid white; }
.no, .nope, .not_good {
    // ...
}
#lol-no {
  // ...
}
```

**Good**

```css
.avatar {
  border-radius: 50%;
  border: 2px solid white;
}

.one,
.selector,
.per-line {
  // ...
}
```

### Comments

* Prefer line comments (`//` in Sass-land) to block comments.
* Prefer comments on their own line. Avoid end-of-line comments.
* Write detailed comments for code that isn't self-documenting:
  - Uses of z-index
  - Compatibility or browser-specific hacks

### OOCSS, BEM and Namespaces

We encourage some combination of OOCSS and BEM for these reasons:

  * It helps create clear, strict relationships between CSS and HTML
  * It helps us create reusable, composable components
  * It allows for less nesting and lower specificity
  * It helps in building scalable stylesheets

**OOCSS**, or “Object Oriented CSS”, is an approach for writing CSS that encourages you to think about your stylesheets as a collection of “objects”: reusuable, repeatable snippets that can be used independently throughout a website.

  * Nicole Sullivan's [OOCSS wiki](https://github.com/stubbornella/oocss/wiki)
  * Smashing Magazine's [Introduction to OOCSS](http://www.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/)

**BEM**, or “Block-Element-Modifier”, is a _naming convention_ for classes in HTML and CSS. It was originally developed by Yandex with large codebases and scalability in mind, and can serve as a solid set of guidelines for implementing OOCSS.

  * CSS Trick's [BEM 101](https://css-tricks.com/bem-101/)
  * Harry Roberts' [introduction to BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)

**Example**

```html
<article class="listing-card listing-card--featured">

  <h1 class="listing-card__title">Adorable 2BR in the sunny Mission</h1>

  <div class="listing-card__content">
    <p>Vestibulum id ligula porta felis euismod semper.</p>
  </div>

</article>
```

```css
.listing-card { }
.listing-card--featured { }
.listing-card__title { }
.listing-card__content { }
```

  * `.listing-card` is the “block” and represents the higher-level component
  * `.listing-card__title` is an “element” and represents a descendant of `.listing-card` that helps compose the block as a whole.
  * `.listing-card--featured` is a “modifier” and represents a different state or variation on the `.listing-card` block.

**The Namespaces**, BEM has already provided great clarity to the classes and adding namespaces on top will bring BEM up another notch that give rich meaning in our HTML. This level of clarity will gives the team greater confidence when reworking existing markup, and helps us to make better and more informed decisions. With this concept self-documenting, transparent UI code are achieved through namespacing.

Below are the 3 namespaces used within the team and its brief description:

  * `o-`: Signify that something is an Object, and that it may be used in any number of unrelated contexts to the one you can currently see it in. Making modifications to these types of class could potentially have knock-on effects in a lot of other unrelated places. Tread carefully.
  * `c-`: Signify that something is a Component. This is a concrete, implementation-specific piece of UI. All of the changes you make to its styles should be detectable in the context you’re currently looking at. Modifying these styles should be safe and have no side effects.
  * `u-`: Signify that this class is a Utility class. It has a very specific role (often providing only one declaration) and should not be bound onto or changed. It can be reused and is not tied to any specific piece of UI. You will probably recognise this namespace from libraries and methodologies like [SUIT](https://suitcss.github.io/).
  * `js[camelCaseElement]`: Signify that this piece of the DOM has some behaviour acting upon it, and that JavaScript binds onto it to provide that behaviour. If you’re not a developer working with JavaScript, leave these well alone. To name the element with behaviour, camelcase naming is used which differ from [Harry Roberts' article](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/) so that on first look it will be known that the element has some JavaScript coding involve that stands out from the BEM naming.

For more examples and explainations on this subject, read Harry Roberts' [More Transparent UI Code with Namespaces](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/).

### ID selectors

While it is possible to select elements by ID in CSS, it should generally be considered an anti-pattern. ID selectors introduce an unnecessarily high level of [specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) to your rule declarations, and they are not reusable.

For more on this subject, read [CSS Wizardry's article](http://csswizardry.com/2014/07/hacks-for-dealing-with-specificity/) on dealing with specificity.

### JavaScript hooks

Avoid binding to the same class in both your CSS and JavaScript. Conflating the two often leads to, at a minimum, time wasted during refactoring when a developer must cross-reference each class they are changing, and at its worst, developers being afraid to make changes for fear of breaking functionality.

We recommend creating JavaScript-specific classes to bind to, prefixed with `.js-`:

```html
<button class="btn btn-primary js-request-to-book">Request to Book</button>
```

## Sass

### ITCSS

**ITCSS**: Inverted Triangle CSS 

A lot of methodologies try and avoid or **ignore** CSS' 'features'. ITCSS makes them work to **our advantage**. ITCSS is a **sane, scalable, managed** architecture for CSS.

* Manages source order.
* Filters explicitness.
* Tames the cascade.
* Sanitises inheritance.

For more on this in-depth explanation and understanding, read [CSS Wizardry's talk on ITCSS](http://csswizardry.net/talks/2014/11/itcss-dafed.pdf).

### Syntax

* Use the `.scss` syntax, never the original `.sass` syntax
* Order your `@extend`, regular CSS and `@include` declarations logically (see below)

### Ordering of property declarations

1. `@extend` declarations

    Just as in other OOP languages, it's helpful to know right away that this “class” inherits from another.

    ```scss
    .btn-green {
      @extend %btn;
      // ...
    }
    ```

2. Property declarations

    Now list all standard property declarations, anything that isn't an `@extend`, `@include`, or a nested selector.

    ```scss
    .btn-green {
      @extend %btn;
      background: green;
      font-weight: bold;
      // ...
    }
    ```

3. `@include` declarations

    Grouping `@include`s at the end makes it easier to read the entire selector, and it also visually separates them from `@extend`s.

    ```scss
    .btn-green {
      @extend %btn;
      background: green;
      font-weight: bold;
      @include transition(background 0.5s ease);
      // ...
    }
    ```

4. Nested selectors

    Nested selectors, _if necessary_, go last, and nothing goes after them. Add whitespace between your rule declarations and nested selectors, as well as between adjacent nested selectors. Apply the same guidelines as above to your nested selectors.

    ```scss
    .btn {
      @extend %btn;
      background: green;
      font-weight: bold;
      @include transition(background 0.5s ease);

      .icon {
        margin-right: 10px;
      }
    }
    ```

### Mixins

Mixins, defined via `@mixin` and called with `@include`, should be used sparingly and only when function arguments are necessary. A mixin without function arguments (i.e. `@mixin hide { display: none; }`) is better accomplished using a placeholder selector (see below) in order to prevent code duplication.

### Placeholders

Placeholders in Sass, defined via `%selector` and used with `@extend`, are a way of defining rule declarations that aren't automatically output in your compiled stylesheet. Instead, other selectors “inherit” from the placeholder, and the relevant selectors are copied to the point in the stylesheet where the placeholder is defined. This is best illustrated with the example below.

Placeholders are powerful but easy to abuse, especially when combined with nested selectors. **As a rule of thumb, avoid creating placeholders with nested rule declarations, or calling `@extend` inside nested selectors.** Placeholders are great for simple inheritance, but can easily result in the accidental creation of additional selectors without paying close attention to how and where they are used.

**Sass**

```sass
// Unless we call `@extend %icon` these properties won't be compiled!
%icon {
  font-family: "Airglyphs";
}

.icon-error {
  @extend %icon;
  color: red;
}

.icon-success {
  @extend %icon;
  color: green;
}
```

**CSS**

```css
.icon-error,
.icon-success {
  font-family: "Airglyphs";
}

.icon-error {
  color: red;
}

.icon-success {
  color: green;
}
```

### Nested selectors

**Do not nest selectors more than three levels deep!**

```scss
.page-container {
  .content {
    .profile {
      // STOP!
    }
  }
}
```

When selectors become this long, you're likely writing CSS that is:

* Strongly coupled to the HTML (fragile) *—OR—*
* Overly specific (powerful) *—OR—*
* Not reusable


Again: **never nest ID selectors!**

If you must use an ID selector in the first place (and you should really try not to), they should never be nested. If you find yourself doing this, you need to revisit your markup, or figure out why such strong specificity is needed. If you are writing well formed HTML and CSS, you should **never** need to do this.
