import { Component, inject, signal } from '@angular/core';
import { FormControl, FormsModule, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IRecipe } from '../IRecipe';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { noDuplicatesValidator } from '../shared/validators/no-duplicates.validator';

@Component({
    selector: 'app-create-recipe-form',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatChipsModule,
        MatIconModule,
        MatButtonModule,
    ],
    styleUrl: './create-recipe-form.component.scss',
    template: `
        <form [formGroup]="recipeForm" (submit)="onSubmit()" class="form">
            <mat-form-field>
                <mat-label for="name">Name</mat-label>
                <input
                    id="name"
                    matInput
                    placeholder="Gib einen Namen ein"
                    formControlName="name"
                    maxlength="nameMaxLength"
                    type="text"
                />
                @if (recipeForm.get('name')?.touched && recipeForm.get('name')?.invalid) {
                    <mat-error>{{ errorMessage() }}</mat-error>
                }
            </mat-form-field>
            <mat-form-field>
                <mat-label>Beschreibung</mat-label>
                <textarea matInput placeholder="chomp chomp chomp"></textarea>
            </mat-form-field>
            <mat-form-field>
                <mat-label for="link">Link zum Rezept</mat-label>
                <input matInput placeholder="Verlinke das Rezept" formControlName="link" />
            </mat-form-field>
            <mat-form-field class="tag-input">
                <mat-label>Tags</mat-label>
                <mat-chip-grid #tagGrid>
                    @for (tag of tags(); track $index) {
                        <mat-chip-row (removed)="onRemoveTag(tag)"
                            >{{ tag }}
                            <button matChipRemove [attr.aria-label]="'remove' + tag">
                                <mat-icon>cancel</mat-icon>
                            </button></mat-chip-row
                        >
                    }
                    <input
                        placeholder="Add Tag…"
                        formControlName="tags"
                        [matChipInputFor]="tagGrid"
                        [matChipInputSeparatorKeyCodes]="tagInputSeperatorKeycodes"
                        (matChipInputTokenEnd)="onAddTag($event)"
                    />
                    @if (recipeForm.get('tags')?.hasError('duplicate')) {
                        <mat-error>{{ errorMessages.duplicateTag }}</mat-error>
                    }
                </mat-chip-grid>
            </mat-form-field>
            <button matButton="filled" type="submit" [disabled]="recipeForm.invalid">Create Recipe</button>
        </form>
        @if (hadError()) {
            <mat-error>{{ errorMessages.invalidTotal }}</mat-error>
        }
    `,
})
export class CreateRecipeFormComponent {
    readonly nameMaxLength = 256;
    readonly tags = signal<string[]>([]);
    readonly tagInputSeperatorKeycodes = [ENTER, COMMA] as const;
    readonly announcer = inject(LiveAnnouncer);
    readonly recipeForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.maxLength(this.nameMaxLength)]),
        link: new FormControl(''),
        tags: new FormControl([], noDuplicatesValidator(this.tags)),
    });

    readonly errorMessage = signal('Darf nicht leer sein');
    readonly errorMessages = {
        duplicateTag: 'Tag existiert bereits!',
        invalidTotal: 'Die Eingabe ist unvollständig!',
    };
    readonly hadError = signal(false);

    constructor() {
        merge(this.recipeForm.controls.name.statusChanges, this.recipeForm.controls.name.valueChanges)
            .pipe(takeUntilDestroyed())
            .subscribe(() => {
                this.updateErrorMessage();
            });
    }

    get tagControl() {
        return <FormControl>this.recipeForm.get('tags');
    }

    updateErrorMessage(): void {
        if (this.recipeForm.get('name')?.hasError('required')) {
            this.errorMessage.set('Darf nicht leer sein');
        } else if (this.recipeForm.controls.name.hasError('maxlength')) {
            this.errorMessage.set('Cannot be longer than 256 characters');
        } else {
            this.errorMessage.set('');
        }
    }

    onSubmit() {
        if (this.recipeForm.valid) {
            this.createRecipe();
        } else {
            this.hadError.set(true);
        }
    }

    onAddTag(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();
        if (value && this.recipeForm.get('tags')?.valid) {
            this.addTag(value);
        }
        event.chipInput!.clear();
    }

    onRemoveTag(tag: string) {
        this.removeTag(tag);
        this.announcer.announce(`removed ${tag}`);
    }

    private addTag(tag: string) {
        this.tags.update(tags => [...tags, tag]);
    }

    private removeTag(tag: string) {
        this.tags.update(tags => {
            const index = tags.indexOf(tag);
            if (index < 0) return tags;
            tags.splice(index, 1);
            return [...tags];
        });
    }

    private createRecipe() {
        let recipe: IRecipe = {
            id: 0,
            name: this.recipeForm.controls.name.value ?? '',
            description: '',
            tags: this.tags(),
            link: this.recipeForm.controls.link.value ?? '',
        };
        console.debug(recipe);
    }
}
