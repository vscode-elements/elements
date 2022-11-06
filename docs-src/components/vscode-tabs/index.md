---
layout: component.njk
title: Tabs
tags: component
component: vscode-tabs
---

# Tabs

```typescript
import '@bendera/vscode-webview-elements/dist/vscode-tabs';
```

## Basic example

The default look mimics the VSCode settings page tabs.

<component-preview>
  <vscode-tabs selected-index="1">
    <vscode-tab-header slot="header">Lorem</vscode-tab-header>
    <vscode-tab-panel>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
        at orci condimentum, malesuada justo id, dapibus ex. Vivamus
        eu mattis nisl. Aenean facilisis bibendum tellus a tincidunt.
        Vestibulum maximus turpis quis semper condimentum. Duis et
        quam faucibus, gravida mauris vitae, vestibulum dui. Vivamus
        est lorem, vulputate et dignissim at, interdum at tellus. Nunc
        imperdiet ultrices mauris, tristique semper libero elementum
        volutpat. Praesent euismod imperdiet euismod. Duis ac
        imperdiet neque. Suspendisse euismod laoreet nisl, at tempor
        magna condimentum ac. In nec posuere mauris, non luctus risus.
        Morbi fermentum vitae velit in aliquam. Aenean malesuada
        condimentum tempus. Fusce ultricies libero nunc, id interdum
        dui tincidunt non. Sed ac accumsan eros, sit amet pharetra
        sem. Donec malesuada diam nec nibh laoreet, iaculis iaculis
        turpis semper.
      </p>
    </vscode-tab-panel>
    <vscode-tab-header slot="header">
      Ipsum<vscode-badge variant="counter" slot="content-after"
        >2</vscode-badge
      >
    </vscode-tab-header>
    <vscode-tab-panel>
      <p>
        Aliquam malesuada rhoncus nulla ac vulputate. Morbi erat
        lacus, pretium sed magna non, porta porttitor metus.
        Pellentesque auctor vitae libero a bibendum. Nulla risus
        mauris, consequat at dictum sit amet, scelerisque vel massa.
        Nullam faucibus nisl eu eros finibus euismod. Nunc tincidunt
        justo ut est semper faucibus quis eu leo. Donec porta eleifend
        euismod. Pellentesque justo felis, elementum et rhoncus in,
        pulvinar id sem. Nulla leo sem, congue vel vehicula in,
        elementum vel urna. Curabitur ornare eu elit eget faucibus. Ut
        posuere pharetra enim, ac varius odio.
      </p>
    </vscode-tab-panel>
    <vscode-tab-header slot="header">Dolor</vscode-tab-header>
    <vscode-tab-panel>
      <p>
        Nulla facilisi. Vivamus semper sodales nulla non condimentum.
        Nullam suscipit gravida pretium. Phasellus hendrerit eget ante
        ac gravida. Etiam at eros hendrerit, sollicitudin nunc id,
        sagittis tortor. Donec sollicitudin in diam in malesuada.
        Quisque bibendum consectetur nibh at interdum. Nulla eros
        magna, commodo vel eros quis, cursus ornare velit. Nam vitae
        vehicula libero, vitae commodo dui. Fusce id tempus ligula.
        Integer pulvinar purus ut ultrices tincidunt. Aenean sed eros
        at orci euismod facilisis et ut nibh. Fusce ac semper dui,
        elementum convallis ipsum. Duis nec felis elit. Cras sit amet
        libero massa.
      </p>
    </vscode-tab-panel>
  </vscode-tabs>
</component-preview>

### HTML

```html
<vscode-tabs selected-index="1">
  <vscode-tab-header slot="header">Lorem</vscode-tab-header>
  <vscode-tab-panel>
    <p>content...</p>
  </vscode-tab-panel>
  <vscode-tab-header slot="header">
    Ipsum
    <vscode-badge variant="counter" slot="content-after">2</vscode-badge>
  </vscode-tab-header>
  <vscode-tab-panel>
    <p>content...</p>
  </vscode-tab-panel>
  <vscode-tab-header slot="header">Dolor</vscode-tab-header>
  <vscode-tab-panel>
    <p>content...</p>
  </vscode-tab-panel>
</vscode-tabs>
```

## Panel mode

The `panel` attribute gives the component a panel-like appearance.

<style>
  .panel-example vscode-tab-panel,
  .panel-example vscode-scrollable {
    height: 200px;
  }

  vscode-tab-panel pre {
    color: var(--vscode-terminal-foreground);
    font-family: var(--vscode-editor-font-family);
    font-size: var(--vscode-editor-font-size);
    font-weight: var(--vscode-editor-font-weight);
    margin: 0;
    white-space: pre-line;
  }
</style>

<component-preview>
  <vscode-tabs selected-index="1" panel class="panel-example">
    <vscode-icon label="Maximize Panel Size" title="Maximize Panel Size" name="chevron-up" slot="addons" action-icon></vscode-icon>
    <vscode-icon label="Close Panel" title="Close Panel" name="close" slot="addons" action-icon></vscode-icon>
    <!-- display:block -->
    <vscode-tab-header slot="header">
      Output<vscode-badge variant="counter" slot="content-after"
        >2</vscode-badge
      >
    </vscode-tab-header>
    <vscode-tab-panel>
      <vscode-scrollable>
        <pre>
          2022-11-06 11:17:37.568 [info] Validating found git in: C:\Program Files\Git\cmd\git.exe
          2022-11-06 11:17:37.568 [info] Using git 2.36.0.windows.1 from C:\Program Files\Git\cmd\git.exe
          2022-11-06 11:17:37.568 [info] > git rev-parse --show-toplevel [340ms]
          2022-11-06 11:17:37.758 [info] > git rev-parse --git-dir --git-common-dir [363ms]
          2022-11-06 11:17:37.765 [info] Log level: Info
          2022-11-06 11:17:37.765 [info] Open repository: c:\workspace\vscode-webview-elements
          2022-11-06 11:17:38.624 [info] > git status -z -uall [825ms]
          2022-11-06 11:17:38.628 [info] > git config --get commit.template [751ms]
          2022-11-06 11:17:38.659 [info] > git for-each-ref --sort -committerdate --format %(refname) %(objectname) %(*objectname) [880ms]
          2022-11-06 11:17:38.682 [info] > git rev-parse --show-toplevel [840ms]
          2022-11-06 11:17:38.693 [info] > git remote --verbose [907ms]
          2022-11-06 11:17:39.566 [info] > git rev-parse --show-toplevel [874ms]
          2022-11-06 11:17:39.614 [info] > git for-each-ref --format=%(refname)%00%(upstream:short)%00%(objectname)%00%(upstream:track)%00%(upstream:remotename)%00%(upstream:remoteref) refs/heads/rel-0.8.0 refs/remotes/rel-0.8.0 [830ms]
          2022-11-06 11:17:40.648 [info] > git rev-parse --show-toplevel [1046ms]
          2022-11-06 11:17:40.662 [info] > git for-each-ref --sort -committerdate --format %(refname) %(objectname) %(*objectname) [903ms]
          2022-11-06 11:17:40.678 [info] > git check-ignore -v -z --stdin [1205ms]
          2022-11-06 11:17:40.734 [info] > git remote --verbose [847ms]
          2022-11-06 11:17:40.939 [info] > git status -z -uall [959ms]
          2022-11-06 11:17:41.068 [info] > git config --get commit.template [930ms]
          2022-11-06 11:17:41.181 [info] > git rev-parse --show-toplevel [522ms]
          2022-11-06 11:17:41.212 [info] > git for-each-ref --format=%(refname)%00%(upstream:short)%00%(objectname)%00%(upstream:track)%00%(upstream:remotename)%00%(upstream:remoteref) refs/heads/rel-0.8.0 refs/remotes/rel-0.8.0 [657ms]
          2022-11-06 11:17:41.618 [info] > git rev-parse --show-toplevel [407ms]
          2022-11-06 11:17:42.116 [info] > git rev-parse --show-toplevel [486ms]
          2022-11-06 11:17:42.438 [info] > git config --local branch.rel-0.8.0.github-pr-owner-number [488ms]
          2022-11-06 11:17:42.601 [info] > git rev-parse --show-toplevel [417ms]
          2022-11-06 11:17:42.926 [info] > git rev-parse --show-toplevel [303ms]
          2022-11-06 11:17:43.124 [info] > git rev-parse --show-toplevel [186ms]
          2022-11-06 11:17:43.334 [info] > git rev-parse --show-toplevel [198ms]
          2022-11-06 11:17:43.592 [info] > git ls-files --stage -- C:\workspace\vscode-webview-elements\docs-src\components\vscode-tabs\index.md [236ms]
          2022-11-06 11:17:43.653 [info] > git show --textconv :docs-src/components/vscode-tabs/index.md [308ms]
          2022-11-06 11:17:43.926 [info] > git cat-file -s 4c1e90e114a3131bb812d660615e092b1257ffb5 [301ms]
          2022-11-06 11:17:44.007 [info] > git config --local branch.rel-0.8.0.github-pr-owner-number [292ms]
          2022-11-06 11:18:00.933 [info] > git remote --verbose [109ms]
          2022-11-06 11:18:00.935 [info] > git for-each-ref --sort -committerdate --format %(refname) %(objectname) %(*objectname) [115ms]
          2022-11-06 11:18:00.940 [info] > git config --get commit.template [101ms]
          2022-11-06 11:18:00.960 [info] > git for-each-ref --format=%(refname)%00%(upstream:short)%00%(objectname)%00%(upstream:track)%00%(upstream:remotename)%00%(upstream:remoteref) refs/heads/rel-0.8.0 refs/remotes/rel-0.8.0 [114ms]
          2022-11-06 11:18:00.988 [info] > git status -z -uall [156ms]
          2022-11-06 11:18:06.976 [info] > git for-each-ref --sort -committerdate --format %(refname) %(objectname) %(*objectname) [124ms]
          2022-11-06 11:18:06.980 [info] > git remote --verbose [120ms]
          2022-11-06 11:18:06.984 [info] > git config --get commit.template [108ms]
          2022-11-06 11:18:06.988 [info] > git for-each-ref --format=%(refname)%00%(upstream:short)%00%(objectname)%00%(upstream:track)%00%(upstream:remotename)%00%(upstream:remoteref) refs/heads/rel-0.8.0 refs/remotes/rel-0.8.0 [101ms]
          2022-11-06 11:18:07.000 [info] > git status -z -uall [132ms]
          2022-11-06 11:18:12.111 [info] > git remote --verbose [96ms]
          2022-11-06 11:18:12.117 [info] > git for-each-ref --sort -committerdate --format %(refname) %(objectname) %(*objectname) [108ms]
          2022-11-06 11:18:12.124 [info] > git config --get commit.template [94ms]
          2022-11-06 11:18:12.128 [info] > git for-each-ref --format=%(refname)%00%(upstream:short)%00%(objectname)%00%(upstream:track)%00%(upstream:remotename)%00%(upstream:remoteref) refs/heads/rel-0.8.0 refs/remotes/rel-0.8.0 [92ms]
          2022-11-06 11:18:12.171 [info] > git status -z -uall [150ms]
          2022-11-06 11:18:17.304 [info] > git remote --verbose [106ms]
          2022-11-06 11:18:17.305 [info] > git for-each-ref --sort -committerdate --format %(refname) %(objectname) %(*objectname) [112ms]
          2022-11-06 11:18:17.319 [info] > git config --get commit.template [106ms]
          2022-11-06 11:18:17.322 [info] > git for-each-ref --format=%(refname)%00%(upstream:short)%00%(objectname)%00%(upstream:track)%00%(upstream:remotename)%00%(upstream:remoteref) refs/heads/rel-0.8.0 refs/remotes/rel-0.8.0 [103ms]
          2022-11-06 11:18:17.333 [info] > git status -z -uall [130ms]
          2022-11-06 11:18:22.513 [info] > git remote --verbose [157ms]
          2022-11-06 11:18:22.515 [info] > git for-each-ref --sort -committerdate --format %(refname) %(objectname) %(*objectname) [164ms]
          2022-11-06 11:18:22.518 [info] > git config --get commit.template [149ms]
          2022-11-06 11:18:22.523 [info] > git for-each-ref --format=%(refname)%00%(upstream:short)%00%(objectname)%00%(upstream:track)%00%(upstream:remotename)%00%(upstream:remoteref) refs/heads/rel-0.8.0 refs/remotes/rel-0.8.0 [146ms]
        </pre>
      </vscode-scrollable>
    </vscode-tab-panel>
    <!-- display:block -->
    <vscode-tab-header slot="header">Terminal</vscode-tab-header>
    <vscode-tab-panel>
      <pre>
        Web Dev Server started...
        [server]
        [server]   Root dir: C:\workspace\vscode-webview-elements
        [server]   Local:    http://localhost:8000/
        [server]   Network:  http://192.168.0.15:8000/
        [server]
      </pre>
    </vscode-tab-panel>
  </vscode-tabs>
</component-preview>

### HTML

```html
<vscode-tabs selected-index="1" panel class="panel-example">
  <vscode-icon
    label="Maximize Panel Size"
    title="Maximize Panel Size"
    name="chevron-up"
    slot="addons"
    action-icon
  ></vscode-icon>
  <vscode-icon
    label="Close Panel"
    title="Close Panel"
    name="close"
    slot="addons"
    action-icon
  ></vscode-icon>
  <vscode-tab-header slot="header">
    Output<vscode-badge variant="counter" slot="content-after">2</vscode-badge>
  </vscode-tab-header>
  <vscode-tab-panel>
    <vscode-scrollable>
      <pre>
        Content...
      </pre>
    </vscode-scrollable>
  </vscode-tab-panel>
  <vscode-tab-header slot="header">Terminal</vscode-tab-header>
  <vscode-tab-panel>
    <pre>
      Content...
    </pre>
  </vscode-tab-panel>
</vscode-tabs>
```
