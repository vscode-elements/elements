---
layout: component.njk
title: Scrollable
tags: component
component: vscode-scrollable
---

# Scrollable

```typescript
import '@bendera/vscode-webview-elements/dist/vscode-scrollable';
```

## Basic example

<style>
  vscode-scrollable {
    height: 200px;
    width: 200px;
  }

  vscode-scrollable p:first-child {
    margin-top: 0;
  }

  vscode-scrollable p:last-child {
    margin-bottom: 0;
  }
</style>

<component-preview>
  <vscode-scrollable>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at orci condimentum, malesuada justo id, dapibus ex. Vivamus eu mattis nisl. Aenean facilisis bibendum tellus a tincidunt. Vestibulum maximus turpis quis semper condimentum. Duis et quam faucibus, gravida mauris vitae, vestibulum dui. Vivamus est lorem, vulputate et dignissim at, interdum at tellus. Nunc imperdiet ultrices mauris, tristique semper libero elementum volutpat. Praesent euismod imperdiet euismod. Duis ac imperdiet neque. Suspendisse euismod laoreet nisl, at tempor magna condimentum ac. In nec posuere mauris, non luctus risus. Morbi fermentum vitae velit in aliquam. Aenean malesuada condimentum tempus. Fusce ultricies libero nunc, id interdum dui tincidunt non. Sed ac accumsan eros, sit amet pharetra sem. Donec malesuada diam nec nibh laoreet, iaculis iaculis turpis semper.</p>
    <p>Aliquam malesuada rhoncus nulla ac vulputate. Morbi erat lacus, pretium sed magna non, porta porttitor metus. Pellentesque auctor vitae libero a bibendum. Nulla risus mauris, consequat at dictum sit amet, scelerisque vel massa. Nullam faucibus nisl eu eros finibus euismod. Nunc tincidunt justo ut est semper faucibus quis eu leo. Donec porta eleifend euismod. Pellentesque justo felis, elementum et rhoncus in, pulvinar id sem. Nulla leo sem, congue vel vehicula in, elementum vel urna. Curabitur ornare eu elit eget faucibus. Ut posuere pharetra enim, ac varius odio.</p>
    <p>Nulla facilisi. Vivamus semper sodales nulla non condimentum. Nullam suscipit gravida pretium. Phasellus hendrerit eget ante ac gravida. Etiam at eros hendrerit, sollicitudin nunc id, sagittis tortor. Donec sollicitudin in diam in malesuada. Quisque bibendum consectetur nibh at interdum. Nulla eros magna, commodo vel eros quis, cursus ornare velit. Nam vitae vehicula libero, vitae commodo dui. Fusce id tempus ligula. Integer pulvinar purus ut ultrices tincidunt. Aenean sed eros at orci euismod facilisis et ut nibh. Fusce ac semper dui, elementum convallis ipsum. Duis nec felis elit. Cras sit amet libero massa.</p>
    <p>Curabitur condimentum odio vitae augue condimentum, nec egestas nunc aliquam. Maecenas quis lacinia sapien, sed feugiat enim. Maecenas sagittis fringilla augue eu auctor. Etiam eu porta nibh. Mauris quis leo elit. Curabitur nec enim bibendum, consectetur ipsum nec, lacinia purus. Donec in nisl bibendum, lacinia urna et, suscipit dui.</p>
    <p>Nullam consectetur mollis dolor, nec hendrerit magna posuere eu. Etiam vitae iaculis sem, et tincidunt arcu. Praesent fermentum justo ac scelerisque pharetra. Etiam mauris erat, tempus et accumsan at, aliquam id augue. Phasellus fermentum magna nulla, eu tristique lacus auctor at. Maecenas in dolor dui. Maecenas eget nisl nec dui feugiat fermentum. Suspendisse varius facilisis dui, quis posuere eros sollicitudin a.</p>
  </vscode-scrollable>
</component-preview>

### CSS

```css
vscode-scrollable {
  height: 200px;
  width: 200px;
}

vscode-scrollable p:first-child {
  margin-top: 0;
}

vscode-scrollable p:last-child {
  margin-bottom: 0;
}
```

### HTML

```html
<vscode-scrollable>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at orci condimentum, malesuada justo id, dapibus ex. Vivamus eu mattis nisl. Aenean facilisis bibendum tellus a tincidunt. Vestibulum maximus turpis quis semper condimentum. Duis et quam faucibus, gravida mauris vitae, vestibulum dui. Vivamus est lorem, vulputate et dignissim at, interdum at tellus. Nunc imperdiet ultrices mauris, tristique semper libero elementum volutpat. Praesent euismod imperdiet euismod. Duis ac imperdiet neque. Suspendisse euismod laoreet nisl, at tempor magna condimentum ac. In nec posuere mauris, non luctus risus. Morbi fermentum vitae velit in aliquam. Aenean malesuada condimentum tempus. Fusce ultricies libero nunc, id interdum dui tincidunt non. Sed ac accumsan eros, sit amet pharetra sem. Donec malesuada diam nec nibh laoreet, iaculis iaculis turpis semper.</p>
    <p>Aliquam malesuada rhoncus nulla ac vulputate. Morbi erat lacus, pretium sed magna non, porta porttitor metus. Pellentesque auctor vitae libero a bibendum. Nulla risus mauris, consequat at dictum sit amet, scelerisque vel massa. Nullam faucibus nisl eu eros finibus euismod. Nunc tincidunt justo ut est semper faucibus quis eu leo. Donec porta eleifend euismod. Pellentesque justo felis, elementum et rhoncus in, pulvinar id sem. Nulla leo sem, congue vel vehicula in, elementum vel urna. Curabitur ornare eu elit eget faucibus. Ut posuere pharetra enim, ac varius odio.</p>
    <p>Nulla facilisi. Vivamus semper sodales nulla non condimentum. Nullam suscipit gravida pretium. Phasellus hendrerit eget ante ac gravida. Etiam at eros hendrerit, sollicitudin nunc id, sagittis tortor. Donec sollicitudin in diam in malesuada. Quisque bibendum consectetur nibh at interdum. Nulla eros magna, commodo vel eros quis, cursus ornare velit. Nam vitae vehicula libero, vitae commodo dui. Fusce id tempus ligula. Integer pulvinar purus ut ultrices tincidunt. Aenean sed eros at orci euismod facilisis et ut nibh. Fusce ac semper dui, elementum convallis ipsum. Duis nec felis elit. Cras sit amet libero massa.</p>
    <p>Curabitur condimentum odio vitae augue condimentum, nec egestas nunc aliquam. Maecenas quis lacinia sapien, sed feugiat enim. Maecenas sagittis fringilla augue eu auctor. Etiam eu porta nibh. Mauris quis leo elit. Curabitur nec enim bibendum, consectetur ipsum nec, lacinia purus. Donec in nisl bibendum, lacinia urna et, suscipit dui.</p>
    <p>Nullam consectetur mollis dolor, nec hendrerit magna posuere eu. Etiam vitae iaculis sem, et tincidunt arcu. Praesent fermentum justo ac scelerisque pharetra. Etiam mauris erat, tempus et accumsan at, aliquam id augue. Phasellus fermentum magna nulla, eu tristique lacus auctor at. Maecenas in dolor dui. Maecenas eget nisl nec dui feugiat fermentum. Suspendisse varius facilisis dui, quis posuere eros sollicitudin a.</p>
</vscode-scrollable>
```
