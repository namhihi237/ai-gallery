'use client';
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '../../components/Icon';
import { useDropzone } from 'react-dropzone';
import { TextInput } from '../../components/TextInput';
import { useMutation } from '@tanstack/react-query';
import { ROUTE } from '../../configs/route';
import { useRouter } from 'next/navigation';
import { ImageCreation, uploadImage } from '../../services/image';
import { ToastEnum } from '../../components/Toast';
import { useToast } from '../../hooks/useToast';
import { v4 as uuidv4 } from 'uuid';

const MAXIMUM_TAGS = 10;

export default function Page() {
  const [fileSelected, setFileSelected] = useState<File | undefined>();
  const [title, setTitle] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>('');

  const router = useRouter();
  const toast = useToast();

  const mutationUploadFile = useMutation<void, Error, ImageCreation>({
    mutationFn: uploadImage,
    onSuccess: () => {
      router.push(ROUTE.HOME);
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setFileSelected(file);
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    multiple: false,
    noClick: true,
  });

  const removeTag = (tagRemoved: string) => {
    const newTags = tags.filter((tag) => tag !== tagRemoved);
    setTags(newTags);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim().toLocaleLowerCase()]);
      setTagInput('');
    }
  };

  const handleSubmit = async () => {
    if (!title || !fileSelected) {
      toast.addToast('Please fill all information!!!', ToastEnum.error);
      return;
    }
    mutationUploadFile.mutate({ file: fileSelected, title, tags });
  };

  const buttonRef = useRef<HTMLButtonElement>(null);

  // Fix click 2 times to open modal
  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.focus();
    }
  }, []);

  return (
    <div className="h-full px-16 py-8">
      {!fileSelected ? (
        <div className="border-dashed border-zinc-600 border-2 h-1/2 p-8">
          <div {...getRootProps()} className="h-full flex justify-center items-center flex-col">
            <p className="text-xl">Drag and drop to upload</p>
            <input {...getInputProps()} />
            <button ref={buttonRef} onClick={open}>
              <Icon iconName="MdCloudUpload" propsIcon={{ size: 150 }} />
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between">
            <div className="max-w-[500px] flex flex-col h-auto">
              <img
                src={URL.createObjectURL(fileSelected)}
                className="object-contain w-full h-full max-w-full max-h-[500px]"
              />
              <button onClick={open} className="mt-1 hover:text-yellow-500 flex justify-center">
                <Icon iconName="FiEdit" />
              </button>
            </div>
            <div className="w-2/5 flex flex-col justify-between">
              <div>
                <TextInput placeholder="Enter the title" label="Title" onChange={setTitle} />
                <div className="mt-4">
                  <label>Tags:</label>
                  <TextInput
                    placeholder={
                      tags.length >= MAXIMUM_TAGS
                        ? `Maximum ${MAXIMUM_TAGS} tags`
                        : 'Enter tags and press Enter'
                    }
                    value={tagInput}
                    onChange={setTagInput}
                    onKeyDown={handleKeyDown}
                    maxLength={15}
                    disabled={tags.length >= MAXIMUM_TAGS}
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <div
                        key={uuidv4()}
                        className="bg-slate-500 hover:bg-slate-400 focus:border rounded-sm py-1 px-2 flex justify-between"
                      >
                        <p className="mr-[2px]"> {tag}</p>
                        <button onClick={() => removeTag(tag)}>
                          <Icon iconName="CiCircleRemove" propsIcon={{ size: 18 }} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                className="px-8 py-2 mt-4 rounded-md bg-cyan-800 hover:bg-cyan-700"
                disabled={mutationUploadFile.isPending}
              >
                {mutationUploadFile.isPending ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  'Upload'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
