---
layout: component.njk
title: FormGroup
tags: component
component: vscode-form-group
---

# VscodeFormGroup

## Basic example

Form group is a container component to organize the form widgets. It applies 
some CSS magic to nicely arrange the elements. The default layout is the horizontal.

<component-preview>
  <vscode-form-group>
    <vscode-label for="basic-inputbox-01">
      Lorem <span class="normal">ipsum</span>:
    </vscode-label>
    <vscode-inputbox id="basic-inputbox-01" placeholder="Placeholder example"></vscode-inputbox>
    <vscode-form-helper>
      <p>Lorem ipsum <code>let dolor = sit amet</code>, consectetur adipiscing elit. <span class="error">Suspendisse</span> faucibus imperdiet sapien, a gravida <a href="#">dolor</a>.</p>
    </vscode-form-helper>
  </vscode-form-group>
</component-preview>

## Vertical layout

<component-preview>
  <vscode-form-group vertical>
    <vscode-label for="basic-inputbox-01">
      Lorem <span class="normal">ipsum</span>:
    </vscode-label>
    <vscode-inputbox id="basic-inputbox-01" placeholder="Placeholder example"></vscode-inputbox>
    <vscode-form-helper>
      <p>Lorem ipsum <code>let dolor = sit amet</code>, consectetur adipiscing elit. <span class="error">Suspendisse</span> faucibus imperdiet sapien, a gravida <a href="#">dolor</a>.</p>
    </vscode-form-helper>
  </vscode-form-group>
</component-preview>

## Settings page group

The `settings-group` layout mimics the settings page of the VSCode. The
recommended item order: label, helper, form widget.

<component-preview>
  <vscode-form-group settings-group vertical>
    <vscode-label for="basic-inputbox-01">
      Lorem <span class="normal">ipsum</span>:
    </vscode-label>
    <vscode-form-helper>
      <p>Lorem ipsum <code>let dolor = sit amet</code>, consectetur adipiscing elit. <span class="error">Suspendisse</span> faucibus imperdiet sapien, a gravida <a href="#">dolor</a>.</p>
    </vscode-form-helper>
    <vscode-inputbox id="basic-inputbox-01" placeholder="Placeholder example"></vscode-inputbox>
  </vscode-form-group>
</component-preview>