<?php

namespace App\Controller\Admin;

use App\Entity\DiveBook;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class DiveBookCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return DiveBook::class;
    }

    /*
    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id'),
            TextField::new('title'),
            TextEditorField::new('description'),
        ];
    }
    */
}
